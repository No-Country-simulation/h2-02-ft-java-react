package com.app.waki.profile.domain;


import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record TotalPoints(Long points) {

    public TotalPoints {
        validatePoints(points);
    }
    private static void validatePoints(Long points) {
        if (points == null) {
            throw new ValidationException("Points must not be null.");
        }
        int MIN_VALUE = 0;
        if (points < MIN_VALUE) {
            throw new ValidationException("Points cannot be less than zero.");
        }
    }
}
