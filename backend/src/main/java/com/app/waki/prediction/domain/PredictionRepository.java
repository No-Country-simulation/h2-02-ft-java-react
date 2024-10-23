package com.app.waki.prediction.domain;

import com.app.waki.prediction.domain.valueObject.PredictionDetailsId;
import com.app.waki.prediction.domain.valueObject.PredictionStatus;
import com.app.waki.prediction.domain.valueObject.ProfileId;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PredictionRepository {

    void savePrediction(PredictionDetails predictionDetails);

    Optional<PredictionDetails> getPredictionDetailsById(PredictionDetailsId id);

    List<PredictionDetails> getAllPredictionDetailsByProfileId(ProfileId profileId);
    List<PredictionDetails> getAllPredictionDetailsByDate(ProfileId profileId, LocalDate creationTime);
    List<PredictionDetails> getAllPredictionDetailsByCompetition(ProfileId profileId, String competition);

    List<PredictionDetails> findPredictionDetailsWithPendingPredictionByMatchId(String matchId, PredictionStatus status
    );
}
