package com.app.waki.profile.infrastructure.jpa;

import com.app.waki.profile.domain.Profile;
import com.app.waki.profile.domain.valueObject.ProfileUserId;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface JpaProfileDataRepository extends JpaRepository<Profile, ProfileUserId> {

    @Query("SELECT p FROM Profile p WHERE p.pointsProcessed = false AND p.totalPoints.points > 0")
    List<Profile> findUnprocessedProfilesWithPoints();

    @Modifying
    @Query("UPDATE Profile p SET p.pointsProcessed = true WHERE p.profileUserId IN :id")
    void markProfilesAsProcessed(@Param("id") List<ProfileUserId> id);

    @EntityGraph(attributePaths = "availablePredictions")
    @Query("SELECT p FROM Profile p JOIN p.availablePredictions ap WHERE ap.predictionDate = :yesterday")
    List<Profile> findProfilesToUpdateAvailablePredictions(@Param("yesterday") LocalDate yesterday);

}
