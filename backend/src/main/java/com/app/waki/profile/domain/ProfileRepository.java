package com.app.waki.profile.domain;


import com.app.waki.profile.domain.valueObject.ProfileUserId;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProfileRepository {

    void save(Profile user);
    Optional<Profile> findById(ProfileUserId userId);
    List<Profile> findAll();

    List<Profile> findUnprocessedProfilesWithPoints();

    void markProfilesAsProcessed(List<ProfileUserId> profileIds);

    List<Profile> updateAvailablePrediction(LocalDate yesterday);

    void saveAll(List<Profile> profiles);
}
