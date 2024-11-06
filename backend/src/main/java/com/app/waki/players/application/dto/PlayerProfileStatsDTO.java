package com.app.waki.players.application.dto;

import com.app.waki.players.domain.player.Birth;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PlayerProfileStatsDTO {
    private Long profileId;
    private String name;
    private String firstname;
    private String lastname;
    private int age;
    private Birth birth;
    private String nationality;
    private boolean injured;
    private String photo;
    private int totalGoals;
    private int totalAppearances;
    private int totalMinutes;
    private int totalAssists;
    private int totalYellowCards;
    private int totalRedCards;
}
