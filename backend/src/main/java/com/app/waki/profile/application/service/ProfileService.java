package com.app.waki.profile.application.service;

import com.app.waki.profile.application.dto.AvailablePredictionDto;
import com.app.waki.profile.application.dto.ProfileDto;

import java.time.LocalDate;
import java.util.UUID;

public interface ProfileService {

    ProfileDto getProfile(UUID id);

    AvailablePredictionDto getAvailablePredictionsByDate(UUID profileId, LocalDate date);
}
