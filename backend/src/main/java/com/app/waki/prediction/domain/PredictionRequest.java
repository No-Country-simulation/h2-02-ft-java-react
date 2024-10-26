package com.app.waki.prediction.domain;

import java.time.LocalDate;

public record PredictionRequest(String matchId, String expectedResult, String homeTeam, String awayTeam,
                                String homeShield, String awayShield,
                                LocalDate matchDay, Double pay, String competition) {
}
