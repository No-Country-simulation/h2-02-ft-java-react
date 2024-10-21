package com.app.waki.common.events;

import java.time.LocalDate;

public record EstablishedPredictionEvent(String predictionId, String profileId, LocalDate creationTime,
                                         Integer points) {
}
