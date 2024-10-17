package com.app.waki.profile.domain.valueObject;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record ProfileUserId(UUID userId) {

    public ProfileUserId {
        Assert.notNull(userId, "id must not be null");
    }
}
