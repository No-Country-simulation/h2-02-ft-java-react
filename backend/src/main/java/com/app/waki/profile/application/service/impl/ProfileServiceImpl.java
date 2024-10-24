package com.app.waki.profile.application.service.impl;

import com.app.waki.common.exceptions.ConcurrencyException;
import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.common.events.CorrectPredictionEvent;
import com.app.waki.profile.application.dto.AvailablePredictionDto;
import com.app.waki.common.events.CreatePredictionRequestEvent;
import com.app.waki.profile.domain.AvailablePrediction;
import com.app.waki.profile.domain.valueObject.ValidateMatchId;
import com.app.waki.common.events.UserCreatedEvent;
import com.app.waki.common.exceptions.ValidationException;
import com.app.waki.profile.application.dto.ProfileDto;
import com.app.waki.profile.application.service.ProfileService;
import com.app.waki.profile.application.utils.ProfileMapper;
import com.app.waki.profile.domain.Profile;
import com.app.waki.profile.domain.ProfileRepository;
import com.app.waki.profile.domain.valueObject.ProfileUserId;
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
        var newProfile = Profile.createProfile(event.id(), event.username());
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
    public List<AvailablePredictionDto> validateAndCreateEventPredictions(UUID profileId, List<CreatePredictionRequestEvent> request) {

        var profile = findProfile(profileId);

        Set<String> matchIds = request.stream()
                .map(CreatePredictionRequestEvent::matchId)
                .collect(Collectors.toSet());

        addMatchIdsToProfile(matchIds, profile);

        Set<LocalDate> requestDates = request.stream()
                .map(CreatePredictionRequestEvent::matchDay)
                .collect(Collectors.toSet());

        Map<LocalDate, AvailablePrediction> predictionMap = getAvailablePredictions(profile, requestDates);

        validatePredictionsForDays(request, predictionMap);

        return saveProfileAndPublishEvent(profile, profileId, request);
    }

    private Profile findProfile (UUID id){
        return repository.findById(new ProfileUserId(id))
                .orElseThrow(()-> new ValidationException("Profile not found with id " + id));
    }

    private void checkErrors(List<String> errors){
        if (!errors.isEmpty()) {
            throw new ValidationException(String.join(", ", errors));
        }
    }

    private void addMatchIdsToProfile(Set<String> matchIds, Profile profile) {
        List<String> errors = new ArrayList<>();
        for (String ids : matchIds) {
            if (!profile.addMatchId(ids)) {
                errors.add("You have already bet on the match with id " + ids);
            }
        }
        checkErrors(errors);
    }

    private Map<LocalDate, AvailablePrediction> getAvailablePredictions(Profile profile, Set<LocalDate> requestDates) {
        List<AvailablePrediction> availablePredictions = profile.getAvailablePredictions().stream()
                .filter(ap -> requestDates.contains(ap.getPredictionDate()))
                .toList();

        if (availablePredictions.isEmpty()) {
            throw new EntityNotFoundException("No available predictions found for profile with ID " + profile.getProfileUserId());
        }

        return availablePredictions.stream()
                .collect(Collectors.toMap(AvailablePrediction::getPredictionDate, ap -> ap));
    }

    private void validatePredictionsForDays(List<CreatePredictionRequestEvent> request, Map<LocalDate, AvailablePrediction> predictionMap) {
        List<String> errors = new ArrayList<>();

        for (CreatePredictionRequestEvent prediction : request) {
            AvailablePrediction availablePrediction = predictionMap.get(prediction.matchDay());
            if (availablePrediction == null) {
                errors.add("There are no predictions available for the day " + prediction.matchDay());
            } else if (!availablePrediction.validateRemainingPredictions(prediction.matchDay())) {
                errors.add("Insufficient predictions for the day " + prediction.matchDay());
            }
        }

        checkErrors(errors);
    }

    private List<AvailablePredictionDto> saveProfileAndPublishEvent(Profile profile, UUID profileId, List<CreatePredictionRequestEvent> request) {
        try {
            var createPredictionEvent = ProfileMapper.predictionRequestToEvent(profileId, request);
            publisher.publishEvent(createPredictionEvent);
            repository.save(profile);
        } catch (OptimisticLockingFailureException e) {
            throw new ConcurrencyException("Available predictions were updated by another transaction. Please try again.");
        }

        return profile.getAvailablePredictions().stream()
                .map(ProfileMapper::availablePredictionsToDto)
                .toList();
    }

    @ApplicationModuleListener
    void onCorrectPredictionToUpdateProfile (CorrectPredictionEvent event){

        Profile profile = findProfile(UUID.fromString(event.profileId()));
        profile.increaseCorrectPredictions();
        profile.updateTotalPoints(event.earnablePoints());
        for (String matchId : event.matchId()) {
            boolean removed = profile.removeMatchId(matchId);
            if (!removed) {
                log.warn("Failed to remove matchId: " + matchId);
            }
        }
        repository.save(profile);
        log.info("Actualizados los puntos en profile: " + event.matchId());
    }
}
