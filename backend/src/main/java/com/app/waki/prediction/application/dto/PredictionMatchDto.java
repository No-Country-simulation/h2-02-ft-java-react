package com.app.waki.prediction.application.dto;

public record PredictionMatchDto(String competition, Boolean combined, int points,
                                 String expectedResult, String homeTeam, String awayTeam,
                                 String homeShield, String awayShield, String competitionShield) {
}
