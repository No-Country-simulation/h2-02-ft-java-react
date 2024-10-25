package com.app.waki.user.application.service;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface TokenService {
    String generateToken(UserDetails userDetails);
    String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);
}
