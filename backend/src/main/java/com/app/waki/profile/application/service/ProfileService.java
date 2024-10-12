package com.app.waki.profile.application.service;

import com.app.waki.profile.application.dto.ProfileDto;

import java.util.UUID;

public interface ProfileService {

    ProfileDto getProfile(UUID id);
}
