package com.app.waki.profile.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record CorrectPredictions(Integer correctPredictions) {

    public CorrectPredictions {
        validatePoints(correctPredictions);
    }
    private static void validatePoints(Integer points) {
        if (points == null) {
            throw new ValidationException("Correct predictions must not be null.");
        }
        int MIN_VALUE = 0;
        if (points < MIN_VALUE) {
            throw new ValidationException("Correct predictions cannot be less than zero.");
        }
    }
}
