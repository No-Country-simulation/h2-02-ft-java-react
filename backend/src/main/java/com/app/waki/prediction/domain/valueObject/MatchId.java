package com.app.waki.prediction.domain.valueObject;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

@Embeddable
public record MatchId(String matchId) {

    public MatchId {
        Assert.notNull(matchId, "id must not be null");
    }
}
