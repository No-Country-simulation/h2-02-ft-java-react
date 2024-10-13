package com.app.waki.prediction.domain;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record PredictionId(UUID id) {

    public PredictionId{
        Assert.notNull(id, "id must not be null");
    }

    public PredictionId() {
        this(UUID.randomUUID());
    }
}
