package com.app.waki.common.events;

import java.time.LocalDate;

public record CreatePredictionRequestEvent(String matchId, String expectedResult,
                                           LocalDate matchDay, Double pay, String competition) {
}
