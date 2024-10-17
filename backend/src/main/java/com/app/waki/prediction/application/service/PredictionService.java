package com.app.waki.prediction.application.service;

import com.app.waki.prediction.application.dto.PredictionDetailsDto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface PredictionService {

    List<PredictionDetailsDto> getAllPredictionDetailsByProfileId(UUID profileId);
    List<PredictionDetailsDto> getAllPredictionDetailsByDate(UUID profileId, LocalDate date);
    List<PredictionDetailsDto> getAllPredictionDetailsByCompetition(UUID profileId, String competition);

}
