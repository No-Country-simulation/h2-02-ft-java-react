package com.app.waki.profile.application.dto;

import java.time.LocalDate;

public record AvailablePredictionDto(LocalDate date, Integer remainingPredictions) {
}
