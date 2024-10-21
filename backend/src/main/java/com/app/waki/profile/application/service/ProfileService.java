package com.app.waki.profile.application.service;

import com.app.waki.profile.application.dto.AvailablePredictionDto;
import com.app.waki.common.events.CreatePredictionRequestEvent;
import com.app.waki.profile.application.dto.ProfileDto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ProfileService {

    ProfileDto getProfile(UUID id);

    AvailablePredictionDto getAvailablePredictionsByDate(UUID profileId, LocalDate date);

    List<AvailablePredictionDto> validateAndCreateEventPredictions(UUID profileId, List<CreatePredictionRequestEvent> prediction);
}
