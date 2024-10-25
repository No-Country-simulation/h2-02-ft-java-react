package com.app.waki.common.events;


import java.util.UUID;

public record UserCreatedEvent(UUID id, String username) {
}
