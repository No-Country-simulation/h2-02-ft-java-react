package com.app.waki.profile.domain;


import com.app.waki.profile.domain.valueObject.ProfileUserId;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository {

    void save(Profile user);
    Optional<Profile> findById(ProfileUserId userId);
    List<Profile> findAll();
}
