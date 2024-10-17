package com.app.waki.prediction.domain.valueObject;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record PredictionId(UUID predictionId) {

    public PredictionId{
        Assert.notNull(predictionId, "id must not be null");
    }

    public PredictionId() {
        this(UUID.randomUUID());
    }
}
