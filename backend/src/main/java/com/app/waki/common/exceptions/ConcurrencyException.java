package com.app.waki.common.exceptions;

public class ConcurrencyException extends RuntimeException{
    public ConcurrencyException(String message){
        super(message);
    }
}
