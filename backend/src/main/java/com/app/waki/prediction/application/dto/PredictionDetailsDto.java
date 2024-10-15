package com.app.waki.prediction.application.dto;

import com.app.waki.prediction.domain.valueObject.EarnablePoints;
import com.app.waki.prediction.domain.valueObject.PredictionDetailsId;
import com.app.waki.prediction.domain.valueObject.PredictionStatus;
import com.app.waki.prediction.domain.valueObject.ProfileId;

import java.time.LocalDate;

public record PredictionDetailsDto(
        String predictionDetailsId,
        String profileId,
        LocalDate creationTime,
        Boolean combined,
        Integer earnablePoints,
        String status
) {
}
