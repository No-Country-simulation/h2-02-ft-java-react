package com.app.waki.user.domain;

public class ValidationException extends RuntimeException {

    ValidationException(String message){
        super(message);
    }
}
