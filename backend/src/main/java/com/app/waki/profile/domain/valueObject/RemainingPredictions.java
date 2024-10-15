package com.app.waki.profile.domain.valueObject;


import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record RemainingPredictions(Integer availablePrediction) {

    public RemainingPredictions {
        validateRemainingPredictions(availablePrediction);
    }
    private static void validateRemainingPredictions(Integer availablePrediction) {
        if (availablePrediction == null) {
            throw new ValidationException("AvailablePrediction must not be null.");
        }
        int MIN_VALUE = 0;
        int MAX_VALUE = 10;
        if (availablePrediction < MIN_VALUE || availablePrediction > MAX_VALUE) {
            throw new ValidationException("The number of valid predictions available must be between " + MIN_VALUE + " and " + MAX_VALUE);
        }
    }
    public boolean hasAvailablePredictions() {
        return this.availablePrediction > 0;
    }
    public int getValue() {
        return this.availablePrediction;
    }

    public RemainingPredictions subtractOne() {
        return new RemainingPredictions(this.availablePrediction - 1);
    }
}
