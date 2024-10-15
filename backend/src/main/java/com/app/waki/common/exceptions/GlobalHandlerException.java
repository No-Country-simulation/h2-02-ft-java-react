package com.app.waki.common.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalHandlerException {

    @ExceptionHandler(EmailNotAvailableException.class)
    public ResponseEntity<Map<String,String>> emailNotAvailableExceptionHandler(EmailNotAvailableException ex){
        Map<String,String> resp = new HashMap<>();

        resp.put("INVALID_EMAIL", ex.getMessage());

        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Map<String,String>> validationExceptionHandler(ValidationException ex){
        Map<String,String> resp = new HashMap<>();

        resp.put("INVALID_DATA", ex.getMessage());

        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String,String>> validationExceptionHandler(EntityNotFoundException ex){
        Map<String,String> resp = new HashMap<>();

        resp.put("NOT_FOUND", ex.getMessage());

        return new ResponseEntity<>(resp, HttpStatus.NOT_FOUND);
    }
}
