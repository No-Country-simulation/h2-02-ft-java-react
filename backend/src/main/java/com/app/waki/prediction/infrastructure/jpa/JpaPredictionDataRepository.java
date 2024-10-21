package com.app.waki.prediction.infrastructure.jpa;

import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.valueObject.MatchId;
import com.app.waki.prediction.domain.valueObject.PredictionDetailsId;
import com.app.waki.prediction.domain.valueObject.PredictionStatus;
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
    List<PredictionDetails> getAllPredictionDetailsByProfileId(@Param("profileId") ProfileId profileId);

    @EntityGraph(attributePaths = {"predictionDetailsId", "profileId", "creationTime", "combined", "earnablePoints", "status", "version"})
    @Query("SELECT pd FROM PredictionDetails pd WHERE pd.profileId = :profileId AND pd.creationTime = :creationTime")
    List<PredictionDetails> getAllPredictionDetailsByDate(@Param("profileId") ProfileId profileId, @Param("creationTime") LocalDate creationTime);

    @Query("SELECT DISTINCT pd FROM PredictionDetails pd " +
            "JOIN FETCH pd.predictions p " +
            "WHERE pd.profileId = :profileId " +
            "AND p.competition = :competition")
    List<PredictionDetails> getAllPredictionDetailsByCompetition(@Param("profileId") ProfileId profileId, @Param("competition") String competition);

    @Query("SELECT pd FROM PredictionDetails pd " +
            "JOIN pd.predictions p " +
            "WHERE p.matchId = :matchId " +
            "AND p.status = :status")
    List<PredictionDetails> findPredictionDetailsWithPendingPredictionByMatchId(
            @Param("matchId") String matchId,
            @Param("status") PredictionStatus status
    );
}
