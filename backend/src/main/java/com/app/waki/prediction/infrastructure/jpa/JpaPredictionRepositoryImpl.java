package com.app.waki.prediction.infrastructure.jpa;

import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.PredictionDetailsId;
import com.app.waki.prediction.domain.PredictionRepository;
import com.app.waki.prediction.domain.ProfileId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JpaPredictionRepositoryImpl implements PredictionRepository {
    private final JpaPredictionDataRepository repository;
    @Override
    public void savePrediction(PredictionDetails predictionDetails) {
        repository.save(predictionDetails);
    }

    @Override
    public Optional<PredictionDetails> getPredictionById(PredictionDetailsId id) {
        return Optional.empty();
    }

    @Override
    public List<PredictionDetails> getAllPredictionByUserId(ProfileId profileId) {
        return null;
    }

    @Override
    public List<PredictionDetails> getAllPredictionByDate(LocalDate creationTime) {
        return null;
    }

    @Override
    public List<PredictionDetails> getAllPredictionByCompetition(String competition) {
        return null;
    }
}
