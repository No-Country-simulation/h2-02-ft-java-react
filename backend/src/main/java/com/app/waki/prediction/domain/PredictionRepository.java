package com.app.waki.prediction.domain;

import com.app.waki.prediction.domain.valueObject.PredictionDetailsId;
import com.app.waki.prediction.domain.valueObject.ProfileId;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PredictionRepository {

    void savePrediction(PredictionDetails predictionDetails);

    Optional<PredictionDetails> getPredictionById(PredictionDetailsId id);

    List<PredictionDetails> getAllPredictionsByProfileId(ProfileId profileId);
    List<PredictionDetails> getAllPredictionByDate(LocalDate creationTime);
    List<PredictionDetails> getAllPredictionByCompetition(String competition);
}
