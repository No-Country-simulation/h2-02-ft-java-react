package com.app.waki.prediction.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record EarnablePoints(Integer points) {

    public EarnablePoints {
        validateEarnPoints(points);
    }
    private static void validateEarnPoints(Integer points) {
        if (points == null) {
            throw new ValidationException("Points must not be null.");
        }
        int MIN_VALUE = 1;
        if (points < MIN_VALUE) {
            throw new ValidationException("The number of points obtainable cannot be less than " + MIN_VALUE );
        }
    }
}
