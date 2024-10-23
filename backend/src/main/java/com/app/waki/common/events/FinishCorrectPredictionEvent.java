package com.app.waki.common.events;

import java.time.LocalDate;

public record FinishCorrectPredictionEvent(String predictionId, String profileId, LocalDate creationTime,
                                           String result, Integer points) { }
