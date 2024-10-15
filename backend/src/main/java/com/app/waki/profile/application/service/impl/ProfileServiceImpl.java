package com.app.waki.profile.application.service.impl;

import com.app.waki.common.exceptions.ConcurrencyException;
import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.profile.application.dto.AvailablePredictionDto;
import com.app.waki.profile.domain.CreatePredictionRequest;
import com.app.waki.profile.domain.AvailablePrediction;
import com.app.waki.user.domain.UserCreatedEvent;
import com.app.waki.common.exceptions.ValidationException;
import com.app.waki.profile.application.dto.ProfileDto;
import com.app.waki.profile.application.service.ProfileService;
import com.app.waki.profile.application.utils.ProfileMapper;
import com.app.waki.profile.domain.Profile;
import com.app.waki.profile.domain.ProfileRepository;
import com.app.waki.profile.domain.valueObjects.ProfileUserId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository repository;
    private final ApplicationEventPublisher publisher;

    @ApplicationModuleListener
    void onUserCreate (UserCreatedEvent event){
        log.info("nuevo usuario con id: " + event.id());
        var newProfile = Profile.createProfile(event.id());
        repository.save(newProfile);
    }

    @Transactional(readOnly = true)
    @Override
    public ProfileDto getProfile(UUID id) {
        var profile = findProfile(id);
        var predictions = profile.getAvailablePredictions();
        return ProfileMapper.profileToDto(profile, predictions);
    }

    @Transactional(readOnly = true)
    @Override
    public AvailablePredictionDto getAvailablePredictionsByDate(UUID profileId, LocalDate date) {
        var profile = findProfile(profileId);
        AvailablePrediction getPredictionByDate = profile.getPredictionByDate(date)
                .orElseThrow(()-> new EntityNotFoundException("No predictions available found with date " + date.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))));
        return ProfileMapper.availablePredictionsToDto(getPredictionByDate);
    }

    @Transactional
    @Override
    public List<AvailablePredictionDto> validateAndCreateEventPredictions(UUID profileId, List<CreatePredictionRequest> request) {

        var profile = findProfile(profileId);

        Set<LocalDate> requestDates = request.stream()
                .map(CreatePredictionRequest::matchDay)
                .collect(Collectors.toSet());

        List<AvailablePrediction> availablePredictions = profile.getAvailablePredictions().stream()
                .filter(ap -> requestDates.contains(ap.getPredictionDate()))
                .toList();

        if (availablePredictions.isEmpty()){
            throw new EntityNotFoundException("No available predictions found for profile with ID " + profileId);
        }

        Map<LocalDate, AvailablePrediction> predictionMap = availablePredictions.stream()
                .collect(Collectors.toMap(AvailablePrediction::getPredictionDate, ap -> ap));

        List<String> errors = new ArrayList<>();

        for (CreatePredictionRequest prediction : request) {
            AvailablePrediction availablePrediction = predictionMap.get(prediction.matchDay());
            if (availablePrediction == null) {
                errors.add("There are no predictions available for the day " + prediction.matchDay());
            } else if (!availablePrediction.validateRemainingPredictions(prediction.matchDay())) {
                errors.add("Insufficient predictions for the day " + prediction.matchDay());
            }
        }

        if (!errors.isEmpty()) {
            throw new ValidationException(String.join(", ", errors));
        }

        try {
            repository.save(profile);
            var createPredictionEvent = ProfileMapper.predictionRequestToEvent(profileId, request);
            publisher.publishEvent(createPredictionEvent);
        } catch (OptimisticLockingFailureException e) {
            throw new ConcurrencyException("Available predictions were updated by another transaction. Please try again.");
        }

        return profile.getAvailablePredictions().stream()
                .map(ProfileMapper::availablePredictionsToDto)
                .toList();
    }

    private Profile findProfile (UUID id){
        return repository.findById(new ProfileUserId(id))
                .orElseThrow(()-> new ValidationException("Profile not found with id " + id));
    }
}
