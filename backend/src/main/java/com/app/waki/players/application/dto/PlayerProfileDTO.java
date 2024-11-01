package com.app.waki.players.application.dto;

import com.app.waki.players.domain.player.Birth;

public record PlayerProfileDTO(
        Long profileId,
        String name,
        String firstname,
        String lastname,
        int age,
        Birth birth,
        String nationality,
        boolean injured,
        String photo
) {
}
