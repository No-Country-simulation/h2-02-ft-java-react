package com.app.waki.user.domain;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

@Embeddable
public record Email(String email) {
    public Email {
        validateEmail(email);
    }
    private static void validateEmail(String email) {
        Assert.notNull(email, "email must not be null");
        String regex = "^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\\.com$";
        if (!email.matches(regex)) {
            throw new IllegalArgumentException("Invalid email format. Only gmail.com, hotmail.com, and outlook.com are allowed.");
        }
    }
}
