package com.app.waki.profile.domain.valueObject;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public class ValidateMatchId {
    private String matchId;

    public ValidateMatchId() {}

    public ValidateMatchId(String matchId) {
        setMatchId(matchId);
    }

    public String getMatchId() {
        return matchId;
    }

    public void setMatchId(String matchId) {
        Objects.requireNonNull(matchId, "MatchId value must not be null");
        if (matchId.trim().isEmpty()) {
            throw new IllegalArgumentException("MatchId value must not be empty");
        }
        this.matchId = matchId;
    }
}
