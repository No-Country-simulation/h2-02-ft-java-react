package com.app.waki.prediction.domain;

import java.time.LocalDate;

public record PredictionRequestDto(String matchId, UserId userId,
                                   String expectedResult, LocalDate matchDay, Double pay, String competition) {
}
