package com.app.waki.prediction.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;

public enum ExpectedResult {
    LOCAL,
    DRAW,
    AWAY;

    public static ExpectedResult fromString(String value) {
        try {
            return ExpectedResult.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ValidationException("Invalid expected result: " + value);
        }
    }
}
