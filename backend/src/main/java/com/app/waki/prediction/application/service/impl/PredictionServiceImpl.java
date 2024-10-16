package com.app.waki.prediction.application.service.impl;

import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.prediction.application.dto.PredictionDetailsDto;
import com.app.waki.prediction.application.service.PredictionService;
import com.app.waki.prediction.application.utils.PredictionMapper;
import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.PredictionRepository;
import com.app.waki.prediction.domain.valueObject.ProfileId;
import com.app.waki.profile.domain.CreatePredictionEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PredictionServiceImpl implements PredictionService {

    private final PredictionRepository repository;

    @ApplicationModuleListener
    void onCreatePrediction (CreatePredictionEvent event){
        log.info("nuevo usuario con id: " + event.profileId());
        var prediction = PredictionMapper.predictionEventToRequest(event);
        PredictionDetails createPrediction = PredictionDetails.createPredictionDetails(
                new ProfileId(event.profileId()),
                prediction
                );
        repository.savePrediction(createPrediction);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PredictionDetailsDto> getAllPredictionDetailsByProfileId(UUID profileId) {

        List<PredictionDetails> predictionsByProfileId = repository.getAllPredictionDetailsByProfileId(new ProfileId(profileId));
        checkIfPredictionsAreEmpty(profileId, predictionsByProfileId);

        return mapPredictionDetailsToDto(predictionsByProfileId);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PredictionDetailsDto> getAllPredictionDetailsByDate(UUID profileId, LocalDate date) {

        List<PredictionDetails> predictionsByDate = repository.getAllPredictionDetailsByDate(new ProfileId(profileId), date);
        checkIfPredictionsAreEmpty(profileId, predictionsByDate);

        return mapPredictionDetailsToDto(predictionsByDate);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PredictionDetailsDto> getAllPredictionDetailsByCompetition(UUID profileId, String competition) {
        List<PredictionDetails> predictionsByCompetition = repository.getAllPredictionDetailsByCompetition(new ProfileId(profileId), competition);
        checkIfPredictionsAreEmpty(profileId, predictionsByCompetition);

        return mapPredictionDetailsToDto(predictionsByCompetition);
    }

    private void checkIfPredictionsAreEmpty(UUID profileId, List<PredictionDetails> predictions){
        if (predictions.isEmpty()){
            throw new EntityNotFoundException("No prediction details were found for the id: " + profileId);
        }
    }

    private List<PredictionDetailsDto> mapPredictionDetailsToDto(List<PredictionDetails> predictions){
        return predictions.stream()
                .map(PredictionMapper::predictionDetailsToDto)
                .toList();
    }


}
