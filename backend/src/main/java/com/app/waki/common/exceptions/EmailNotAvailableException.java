package com.app.waki.common.exceptions;

public class EmailNotAvailableException extends RuntimeException{
    public EmailNotAvailableException(String message){
        super(message);
    }
}
