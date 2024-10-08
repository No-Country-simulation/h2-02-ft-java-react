package com.app.waki.user.application;

import com.app.waki.user.domain.EmailNotAvailableException;
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

}
