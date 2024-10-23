package com.app.waki.user.application.dto;

import java.util.UUID;

public record JwtAuthToken(String token, UUID userId) {
}
