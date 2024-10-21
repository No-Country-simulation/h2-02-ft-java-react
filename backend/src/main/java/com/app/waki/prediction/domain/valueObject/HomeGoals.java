package com.app.waki.prediction.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record HomeGoals(Integer homeGoals) {
    public HomeGoals {
        validateHomeGoals(homeGoals);
    }
    private static void validateHomeGoals(Integer homeGoals) {
        if (homeGoals == null) {
            throw new ValidationException("Goals must not be null.");
        }
        int MIN_VALUE = 0;
        if (homeGoals < MIN_VALUE) {
            throw new ValidationException("The number of goals cannot be less than " + MIN_VALUE );
        }
    }
}
