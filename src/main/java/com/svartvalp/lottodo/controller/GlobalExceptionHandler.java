package com.svartvalp.lottodo.controller;

import com.svartvalp.lottodo.exception.EntityAlreadyExistsException;
import com.svartvalp.lottodo.exception.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleMethodArgumentNotValidException(MethodArgumentNotValidException exc) {
        Map<String, String> response = new HashMap<>();
        response.put("status", Integer.toString(HttpStatus.BAD_REQUEST.value()));
        response.put("message", exc
                .getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + " " + error.getDefaultMessage()).collect(Collectors.joining(";")));
        return response;
    }

    @ExceptionHandler(value = {Exception.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handleException(Exception e) {
        Map<String, String> response = new HashMap<>();
        response.put("status", Integer.toString(HttpStatus.BAD_REQUEST.value()));
        response.put("message", e.getLocalizedMessage());
        return response;
    }

    @ExceptionHandler(value = {EntityNotFoundException.class, EntityAlreadyExistsException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleCleintErrors(RuntimeException e) {
        Map<String, String> response = new HashMap<>();
        response.put("status", Integer.toString(HttpStatus.BAD_REQUEST.value()));
        response.put("message", e.getLocalizedMessage());
        return response;
    }

}
