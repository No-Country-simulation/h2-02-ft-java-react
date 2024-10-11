package com.app.waki.user.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record Email(String email) {
    public Email {
        validateEmail(email);
    }
    private static void validateEmail(String email) {
        if (email == null) {
            throw new ValidationException("Email must not be null");
        }

        String regex = "^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\\.com$";
        if (!email.matches(regex)) {
            throw new ValidationException("Invalid email format. Only gmail.com, hotmail.com, and outlook.com are allowed.");
        }
    }
}
