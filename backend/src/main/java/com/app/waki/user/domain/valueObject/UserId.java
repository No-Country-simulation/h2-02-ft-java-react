package com.app.waki.user.domain.valueObject;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record UserId(UUID id) {
    public UserId {
        Assert.notNull(id, "id must not be null");
    }

    public UserId() {
        this(UUID.randomUUID());
    }
}
