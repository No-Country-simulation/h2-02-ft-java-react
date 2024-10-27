package com.app.waki.prediction.application.dto;


import java.util.List;

public record PredictionActiveDto(String predictionDetailsId, int totalPoints, String status, List<PredictionMatchDto> match) {
}
