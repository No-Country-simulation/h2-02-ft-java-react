package com.app.waki.profile.infrastructure.jpa;

import com.app.waki.profile.domain.Profile;
import com.app.waki.profile.domain.ProfileRepository;
import com.app.waki.profile.domain.valueObject.ProfileUserId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class JpaProfileRepositoryImpl implements ProfileRepository {
    private final JpaProfileDataRepository jpaRepository;
    @Override
    public void save(Profile user) {
        jpaRepository.save(user);
    }

    @Override
    public Optional<Profile> findById(ProfileUserId userId) {
        return jpaRepository.findById(userId);
    }

    @Override
    public List<Profile> findAll() {
        return jpaRepository.findAll();
    }

    @Override
    public List<Profile> findUnprocessedProfilesWithPoints() {
        return jpaRepository.findUnprocessedProfilesWithPoints();
    }

    @Override
    public void markProfilesAsProcessed(List<ProfileUserId> profileIds) {
        jpaRepository.markProfilesAsProcessed(profileIds);
    }

    @Override
    public List<Profile> updateAvailablePrediction(LocalDate yesterday) {
        return jpaRepository.findProfilesToUpdateAvailablePredictions(yesterday);
    }

    @Override
    public void saveAll(List<Profile> profiles) {
        jpaRepository.saveAll(profiles);
    }

}
