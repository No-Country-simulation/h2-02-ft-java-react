package com.app.waki.user.domain;

import io.jsonwebtoken.lang.Assert;

class PasswordValidator {
    public static String validatePassword(String PasswordText) {
        Assert.notNull(PasswordText, "Password must not be null");
        String regex = "^(?=.*[a-z])(?=.*[A-Z]).{8,}$";
        if (!PasswordText.matches(regex)) {
            throw new IllegalArgumentException("Invalid password format. Password must have at least 8 characters, one uppercase letter, and one lowercase letter.");
        }
        return PasswordText;
    }
}
