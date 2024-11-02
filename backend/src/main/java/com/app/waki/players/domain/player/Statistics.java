package com.app.waki.players.domain.player;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Statistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idPlayer;

    @Embedded
    private Team team;

    @Embedded
    private League league;

    @Embedded
    private Games games;

    @Embedded
    private Goals goals;

    @Embedded
    private Cards cards;

}
