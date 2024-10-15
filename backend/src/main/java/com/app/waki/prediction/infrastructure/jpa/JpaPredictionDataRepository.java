package com.app.waki.prediction.infrastructure.jpa;

import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.valueObject.PredictionDetailsId;
import com.app.waki.prediction.domain.valueObject.ProfileId;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface JpaPredictionDataRepository extends JpaRepository<PredictionDetails, PredictionDetailsId> {

    @EntityGraph(attributePaths = {"predictionDetailsId", "profileId", "creationTime", "combined", "earnablePoints", "status", "version"})
    @Query("SELECT pd FROM PredictionDetails pd WHERE pd.profileId = :profileId")
    List<PredictionDetails> getAllPredictionsByProfileId(@Param("profileId") ProfileId profileId);

    @EntityGraph(attributePaths = {"predictionDetailsId", "profileId", "creationTime", "combined", "earnablePoints", "status", "version"})
    @Query("SELECT pd FROM PredictionDetails pd WHERE pd.profileId = :profileId AND pd.creationTime = :creationTime")
    List<PredictionDetails> getAllPredictionByDate(@Param("profileId") ProfileId profileId, @Param("creationTime") LocalDate creationTime);
}
