package com.app.waki.user.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record Password(String password) {
    public Password {
        validatePassword(password);
    }
    private static void validatePassword(String password) {
        if (password == null) {
            throw new ValidationException("Password must not be null.");
        }

        String regex = "^(?=.*[a-z])(?=.*[A-Z]).{8,}$";
        if (!password.matches(regex)) {
            throw new ValidationException("Invalid password format. Password must have at least 8 characters, one uppercase letter, and one lowercase letter.");
        }
    }
}