package com.app.waki.prediction.application.dto;

public record PredictionMatchDto(String competition, Boolean combined, int points,
                                 String finalResult, String homeTeam, String awayTeam,
                                 String homeShield, String awayShield, String competitionShield) {
}
