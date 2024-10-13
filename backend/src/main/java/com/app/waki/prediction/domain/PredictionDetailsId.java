package com.app.waki.prediction.domain;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record PredictionDetailsId(UUID id) {

    public PredictionDetailsId{
        Assert.notNull(id, "id must not be null");
    }

    public PredictionDetailsId() {
        this(UUID.randomUUID());
    }
}
