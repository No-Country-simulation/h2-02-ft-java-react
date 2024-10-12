package com.app.waki.profile.application.service.impl;

import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.profile.application.dto.AvailablePredictionDto;
import com.app.waki.profile.domain.AvailablePrediction;
import com.app.waki.user.domain.UserCreatedEvent;
import com.app.waki.common.exceptions.ValidationException;
import com.app.waki.profile.application.dto.ProfileDto;
import com.app.waki.profile.application.service.ProfileService;
import com.app.waki.profile.application.utils.ProfileMapper;
import com.app.waki.profile.domain.Profile;
import com.app.waki.profile.domain.ProfileRepository;
import com.app.waki.profile.domain.valueObjects.ProfileUserId;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository repository;

    @ApplicationModuleListener
    void onUserCreate (UserCreatedEvent event){
        log.info("nuevo usuario con id: " + event.id());
        var newProfile = Profile.createProfile(event.id());
        repository.save(newProfile);
    }

    @Override
    public ProfileDto getProfile(UUID id) {
        var profile = findProfile(id);
        return ProfileMapper.profileToDto(profile);
    }

    @Override
    public AvailablePredictionDto getAvailablePredictionsByDate(UUID profileId, LocalDate date) {
        var profile = findProfile(profileId);
        AvailablePrediction getPredictionByDate = profile.getPredictionByDate(date)
                .orElseThrow(()-> new EntityNotFoundException("No predictions available found with date " + date.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))));
        return ProfileMapper.predictionToDto(getPredictionByDate);
    }

    private Profile findProfile (UUID id){
        return repository.findById(new ProfileUserId(id))
                .orElseThrow(()-> new ValidationException("Profile not found with id " + id));
    }
}
