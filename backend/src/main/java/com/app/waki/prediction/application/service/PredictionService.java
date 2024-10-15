package com.app.waki.prediction.application.service;

import com.app.waki.prediction.application.dto.PredictionDetailsDto;

import java.util.List;
import java.util.UUID;

public interface PredictionService {

    List<PredictionDetailsDto> getAllPredictionsByProfileId(UUID profileId);
}
