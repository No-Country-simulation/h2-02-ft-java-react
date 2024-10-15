package com.app.waki.profile.domain;


import com.app.waki.profile.domain.valueObjects.ProfileUserId;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ProfileRepository {

    void save(Profile user);
    Optional<Profile> findById(ProfileUserId userId);
    List<Profile> findAll();
}
