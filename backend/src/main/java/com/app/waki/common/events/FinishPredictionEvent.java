package com.app.waki.common.events;

import java.time.LocalDate;

public record FinishPredictionEvent(String predictionId, String profileId, LocalDate creationTime,
                                    String result) { }
