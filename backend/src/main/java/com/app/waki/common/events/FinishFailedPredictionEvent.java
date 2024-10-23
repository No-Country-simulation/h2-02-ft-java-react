package com.app.waki.common.events;

import java.time.LocalDate;

public record FinishFailedPredictionEvent(String predictionId, String profileId, LocalDate creationTime,
                                          String result, Integer points) {
}
