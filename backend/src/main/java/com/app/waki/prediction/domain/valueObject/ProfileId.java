package com.app.waki.prediction.domain.valueObject;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record ProfileId(UUID profileId) {

    public ProfileId {
        Assert.notNull(profileId, "id must not be null");
    }
}
