package com.app.waki.prediction.application.service.impl;

import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.match.matchtest.MatchFinalizedEvent;
import com.app.waki.prediction.application.dto.PredictionDetailsDto;
import com.app.waki.prediction.application.service.PredictionService;
import com.app.waki.prediction.application.utils.PredictionMapper;
import com.app.waki.common.events.CorrectPredictionEvent;
import com.app.waki.prediction.domain.Prediction;
import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.PredictionRepository;
import com.app.waki.prediction.domain.valueObject.MatchResult;
import com.app.waki.prediction.domain.valueObject.PredictionStatus;
import com.app.waki.prediction.domain.valueObject.ProfileId;
import com.app.waki.common.events.CreatePredictionEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
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
    private final ApplicationEventPublisher publisher;

    @ApplicationModuleListener
    void onCreatePrediction (CreatePredictionEvent event){
        log.info("new prediction with profile id: " + event.profileId());
        var prediction = PredictionMapper.predictionEventToRequest(event);
        PredictionDetails createPrediction = PredictionDetails.createPredictionDetails(
                new ProfileId(event.profileId()),
                prediction
                );
        repository.savePrediction(createPrediction);
        publisher.publishEvent(PredictionMapper.establishedPredictionEvent(createPrediction));
    }

    @ApplicationModuleListener
    void onFinalizeMatch (MatchFinalizedEvent event){

        log.info("nuevo partido finalizado con id: " + event.matchId());

        List<PredictionDetails> predictionDetails = repository.findPredictionDetailsWithPendingPredictionByMatchId(event.matchId(), PredictionStatus.PENDING);

        checkIfPredictionsAreEmpty(predictionDetails);

        predictionDetails.forEach(details -> {
            Prediction prediction = details.getPredictionByMatchId(event.matchId());
            updatePredictionStatus(details, prediction, event.result(), event.homeGoals(), event.awayGoals());
        });
    }

    private void updatePredictionStatus(PredictionDetails details, Prediction prediction, String matchResult,
                                        Integer homeGoals, Integer awayGoals) {

        prediction.updateMatchResult(MatchResult.valueOf(matchResult), homeGoals, awayGoals);

        var matchId = prediction.getMatchId();

        if (prediction.isPredictionCorrect()) {
            if (prediction.getCombined()) {
                handleCombinedCorrectPrediction(details);
            } else {
                handleIndividualCorrectPrediction(details, matchId);
            }
        } else {
            if (prediction.getCombined()) {
                handleCombinedWrongPrediction(details);
            } else {
                handleIndividualWrongPrediction(details);
            }
        }
    }

    private void handleIndividualWrongPrediction(PredictionDetails details) {

        details.decrementPendingPredictions();
        details.setStatus(PredictionStatus.FAILED);
        log.info("Predicción individual errada");
        // EVENTO PARA NOTIFICAR AL USUARIO DE LA PREDICCION FALLIDA
        publisher.publishEvent(PredictionMapper.failedPredictionEvent(details));
    }

    private void handleCombinedWrongPrediction(PredictionDetails details) {

        details.getRemainingPredictions().forEach(pr -> {
            pr.setPredictionStatus(PredictionStatus.FAILED);
            pr.setMatchResult(MatchResult.FAILED_COMBINED);
        });
        details.setStatus(PredictionStatus.FAILED);
        details.setPendingPredictions(0);
        log.info("Predicción combinada errada");
        // EVENTO PARA NOTIFICAR AL USUARIO DE LA PREDICTION COMBINADA FALLIDA
        publisher.publishEvent(PredictionMapper.failedPredictionEvent(details));
    }


    private void handleIndividualCorrectPrediction(PredictionDetails details, String matchId) {

        details.decrementPendingPredictions();
        details.setStatus(PredictionStatus.CORRECT);
        log.info("Predicción individual acertada");

        // EVENTO PARA NOTIFICAR AL USUARIO DE LA PREDICTION ACERTADA
        publisher.publishEvent(PredictionMapper.correctPredictionEvent(details));

        // EVENTO PARA ACTUALIZAR PERFIL
        publisher.publishEvent(new CorrectPredictionEvent(
                details.getProfileId().profileId().toString(),
                List.of(matchId),
                details.getEarnablePoints().points()));
    }


    private void handleCombinedCorrectPrediction(PredictionDetails details) {

        details.decrementPendingPredictions();
        log.info("Combinada acertada");

        if (details.getPendingPredictions() == 0) {
            details.setStatus(PredictionStatus.CORRECT);
            log.info("Última predicción de la combinada acertada");
            List<String> matchIds = details.getPredictions()
                                            .stream()
                                            .map(Prediction::getMatchId)
                                            .toList();
            // EVENTO PARA ACTUALIZAR PERFIL
            publisher.publishEvent(new CorrectPredictionEvent(
                    details.getProfileId().profileId().toString(),
                    matchIds,
                    details.getEarnablePoints().points()));
            // EVENTO PARA NOTIFICAR AL USUARIO DE LA PREDICTION COMBINADA ACERTADA
            publisher.publishEvent(PredictionMapper.correctPredictionEvent(details));

        }
    }


    @Transactional(readOnly = true)
    @Override
    public List<PredictionDetailsDto> getAllPredictionDetailsByProfileId(UUID profileId) {

        List<PredictionDetails> predictionsByProfileId = repository.getAllPredictionDetailsByProfileId(new ProfileId(profileId));
        checkIfPredictionsAreEmpty(predictionsByProfileId);

        return mapPredictionDetailsToDto(predictionsByProfileId);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PredictionDetailsDto> getAllPredictionDetailsByDate(UUID profileId, LocalDate date) {

        List<PredictionDetails> predictionsByDate = repository.getAllPredictionDetailsByDate(new ProfileId(profileId), date);
        checkIfPredictionsAreEmpty(predictionsByDate);

        return mapPredictionDetailsToDto(predictionsByDate);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PredictionDetailsDto> getAllPredictionDetailsByCompetition(UUID profileId, String competition) {
        List<PredictionDetails> predictionsByCompetition = repository.getAllPredictionDetailsByCompetition(new ProfileId(profileId), competition);
        checkIfPredictionsAreEmpty(predictionsByCompetition);

        return mapPredictionDetailsToDto(predictionsByCompetition);
    }

    private void checkIfPredictionsAreEmpty(List<PredictionDetails> predictions){
        if (predictions.isEmpty()){
            throw new EntityNotFoundException("No prediction was found with that reference");
        }
    }

    private List<PredictionDetailsDto> mapPredictionDetailsToDto(List<PredictionDetails> predictions){
        return predictions.stream()
                .map(PredictionMapper::predictionDetailsToDto)
                .toList();
    }


}
