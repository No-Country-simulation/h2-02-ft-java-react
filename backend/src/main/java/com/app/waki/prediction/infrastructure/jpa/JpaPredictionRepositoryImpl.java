package com.app.waki.prediction.infrastructure.jpa;

import com.app.waki.prediction.domain.Prediction;
import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.valueObject.MatchId;
import com.app.waki.prediction.domain.valueObject.PredictionDetailsId;
import com.app.waki.prediction.domain.PredictionRepository;
import com.app.waki.prediction.domain.valueObject.PredictionStatus;
import com.app.waki.prediction.domain.valueObject.ProfileId;
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
    public Optional<PredictionDetails> getPredictionDetailsById(PredictionDetailsId id) {

        return repository.findById(id);
    }

    @Override
    public List<PredictionDetails> getAllPredictionDetailsByProfileId(ProfileId profileId) {

        return repository.getAllPredictionDetailsByProfileId(profileId);
    }

    @Override
    public List<PredictionDetails> getAllPredictionDetailsByDate(ProfileId profileId, LocalDate matchDay) {

        return repository.getAllPredictionDetailsByDate(profileId, matchDay);
    }

    @Override
    public List<PredictionDetails> getAllPredictionDetailsByCompetition(ProfileId profileId, String competition) {
        return repository.getAllPredictionDetailsByCompetition(profileId, competition);
    }

    @Override
    public List<PredictionDetails> findPredictionDetailsWithPendingPredictionByMatchId(String matchId, PredictionStatus status) {
        return repository.findPredictionDetailsWithPendingPredictionByMatchId(matchId,status);
    }

    @Override
    public Optional<Prediction> findPredictionByProfileIdAndMatchId(ProfileId profileId, String matchId) {
        return repository.findPredictionByProfileIdAndMatchId(profileId, matchId);
    }

    @Override
    public boolean existsPredictionByProfileIdAndMatchId(ProfileId profileId, String matchId) {
        return repository.existsPredictionByProfileIdAndMatchId(profileId, matchId);
    }


}
