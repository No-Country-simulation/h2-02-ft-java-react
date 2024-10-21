package com.app.waki.prediction.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record AwayGoals(Integer awayGoals) {

    public AwayGoals {
        validateAwayGoals(awayGoals);
    }
    private static void validateAwayGoals(Integer awayGoals) {
        if (awayGoals == null) {
            throw new ValidationException("Goals must not be null.");
        }
        int MIN_VALUE = 0;
        if (awayGoals < MIN_VALUE) {
            throw new ValidationException("The number of goals cannot be less than " + MIN_VALUE );
        }
    }
}
