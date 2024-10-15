package com.app.waki.user.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record UserName(String name) {

    public UserName {
        validateName(name);
    }
    private static void validateName(String name) {
        if (name == null) {
            throw new ValidationException("Name must not be null.");
        }
        int MIN_LENGTH = 2;
        int MAX_LENGTH = 30;
        if (name.length() < MIN_LENGTH || name.length() > MAX_LENGTH) {
            throw new ValidationException("The name text must contain between " + MIN_LENGTH + " and " + MAX_LENGTH + " characters.");
        }
    }
}
