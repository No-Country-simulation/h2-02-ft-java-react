package com.app.waki.profile.domain.valueObjects;


import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record RemainingPredictions(Integer AvailablePrediction) {

    public RemainingPredictions {
        validateRemainingPredictions(AvailablePrediction);
    }
    private static void validateRemainingPredictions(Integer AvailablePrediction) {
        if (AvailablePrediction == null) {
            throw new ValidationException("AvailablePrediction must not be null.");
        }
        int MIN_VALUE = 0;
        int MAX_VALUE = 10;
        if (AvailablePrediction < MIN_VALUE || AvailablePrediction > MAX_VALUE) {
            throw new ValidationException("The number of valid predictions available must be between " + MIN_VALUE + " and " + MAX_VALUE);
        }
    }
}
