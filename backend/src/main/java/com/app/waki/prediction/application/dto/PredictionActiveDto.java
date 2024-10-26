package com.app.waki.prediction.application.dto;


import java.util.List;

public record PredictionActiveDto(String predictionDetailsId, int combinedPoints, String status, List<PredictionMatchDto> match) {
}
