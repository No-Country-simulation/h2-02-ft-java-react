package com.app.waki.common.exceptions;

public class InsufficientPredictionsException extends RuntimeException  {
    public InsufficientPredictionsException(String message){
        super(message);
    }
}
