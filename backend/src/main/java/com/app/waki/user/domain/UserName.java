package com.app.waki.user.domain;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

@Embeddable
public record UserName(String name) {

    public UserName {
        validateName(name);
    }
    private static void validateName(String name) {
        Assert.notNull(name, "the name must not be null");
        int MIN_LENGTH = 2;
        int MAX_LENGTH = 30;
        if (name.length() < MIN_LENGTH || name.length() > MAX_LENGTH) {
            throw new IllegalArgumentException("The name text must contain between " + MIN_LENGTH + " and " + MAX_LENGTH + " characters.");
        }
    }
}
