package com.app.waki.prediction.application.service;

import com.app.waki.prediction.application.dto.PredictionActiveDto;
import com.app.waki.prediction.application.dto.PredictionDetailsDto;
import com.app.waki.prediction.application.dto.PredictionDto;
import com.app.waki.prediction.domain.Prediction;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface PredictionService {

    List<PredictionActiveDto> getAllPredictionDetailsByProfileId(UUID profileId);
    List<PredictionActiveDto> getAllPredictionDetailsByDate(UUID profileId, LocalDate date);
    List<PredictionDetailsDto> getAllPredictionDetailsByCompetition(UUID profileId, String competition);

    PredictionDto getPredictionByProfileIdAndMatchId(UUID profileId, String matchId);
}
