package com.app.waki.prediction.domain;

import com.app.waki.common.exceptions.ValidationException;

public enum MatchResult {
    PENDING,
    LOCAL,
    DRAW,
    AWAY;

    public static MatchResult fromString(String value) {
        try {
            return MatchResult.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ValidationException("Invalid expected result: " + value);
        }
    }
}
