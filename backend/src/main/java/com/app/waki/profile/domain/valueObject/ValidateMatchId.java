package com.app.waki.profile.domain.valueObject;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public record ValidateMatchId(String matchId) {
    public ValidateMatchId {
        Objects.requireNonNull(matchId, "MatchId value must not be null");
        if (matchId.trim().isEmpty()) {
            throw new IllegalArgumentException("MatchId value must not be empty");
        }
    }
}
