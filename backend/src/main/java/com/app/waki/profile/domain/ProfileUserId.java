package com.app.waki.profile.domain;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

@Embeddable
public record ProfileUserId(String userId) {

    public ProfileUserId {
        Assert.notNull(userId, "id must not be null");
    }
}
