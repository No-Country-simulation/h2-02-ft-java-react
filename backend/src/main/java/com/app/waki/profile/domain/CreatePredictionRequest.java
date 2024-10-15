package com.app.waki.profile.domain;

import java.time.LocalDate;

public record CreatePredictionRequest(String matchId, String expectedResult,
                                      LocalDate matchDay, Double pay, String competition) {
}
