package com.app.waki.prediction.domain;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

@Embeddable
public record MatchId(String id) {

    public MatchId {
        Assert.notNull(id, "id must not be null");
    }
}
