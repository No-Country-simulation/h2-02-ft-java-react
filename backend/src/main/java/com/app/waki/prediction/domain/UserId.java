package com.app.waki.prediction.domain;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record UserId(UUID userId) {

    public UserId {
        Assert.notNull(userId, "id must not be null");
    }
}
