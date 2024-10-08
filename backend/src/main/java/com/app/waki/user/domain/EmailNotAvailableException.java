package com.app.waki.user.domain;

public class EmailNotAvailableException extends RuntimeException{
    public EmailNotAvailableException(String message){
        super(message);
    }
}
