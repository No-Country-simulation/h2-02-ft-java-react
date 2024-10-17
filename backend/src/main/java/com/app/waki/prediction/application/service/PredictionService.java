package com.app.waki.prediction.application.service;

import com.app.waki.prediction.application.dto.PredictionDetailsDto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface PredictionService {

    List<PredictionDetailsDto> getAllPredictionsByProfileId(UUID profileId);
    List<PredictionDetailsDto> getAllPredictionByDate(UUID profileId, LocalDate date);
}
