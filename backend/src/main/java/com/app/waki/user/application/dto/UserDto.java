package com.app.waki.user.application.dto;

import java.util.UUID;

public record UserDto(UUID id, String username, String email) {
}
