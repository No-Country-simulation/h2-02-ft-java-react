package com.app.waki.players.domain.player;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlayerProfile {
    private Long profileId;
    private String name;
    private String firstname;
    private String lastname;
    private int age;

    @Embedded
    private Birth birth;

    private String nationality;
    private boolean injured;
    private String photo;
}
