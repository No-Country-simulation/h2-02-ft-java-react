package com.app.waki.profile.domain.valueObject;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record AvailablePredictionId(UUID id) {

    public AvailablePredictionId {
        Assert.notNull(id, "id must not be null");
    }

    public AvailablePredictionId() {
        this(UUID.randomUUID());
    }
}
