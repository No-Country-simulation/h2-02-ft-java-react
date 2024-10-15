package com.app.waki.prediction.domain;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record ProfileId(UUID userId) {

    public ProfileId {
        Assert.notNull(userId, "id must not be null");
    }
}
