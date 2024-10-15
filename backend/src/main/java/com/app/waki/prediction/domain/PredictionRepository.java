package com.app.waki.prediction.domain;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PredictionRepository {

    void savePrediction(PredictionDetails predictionDetails);

    Optional<PredictionDetails> getPredictionById(PredictionDetailsId id);

    List<PredictionDetails> getAllPredictionByUserId(ProfileId profileId);
    List<PredictionDetails> getAllPredictionByDate(LocalDate creationTime);
    List<PredictionDetails> getAllPredictionByCompetition(String competition);
}
