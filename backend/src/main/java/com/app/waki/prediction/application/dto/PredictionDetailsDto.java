package com.app.waki.prediction.application.dto;


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
