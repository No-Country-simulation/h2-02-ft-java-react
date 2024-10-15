package com.app.waki.prediction.domain.valueObject;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record PredictionDetailsId(UUID detailsId) {

    public PredictionDetailsId{
        Assert.notNull(detailsId, "id must not be null");
    }

    public PredictionDetailsId() {
        this(UUID.randomUUID());
    }
}
