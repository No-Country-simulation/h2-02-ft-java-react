package com.app.waki.match.domain.standings;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "standings")
public class Standing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private LeagueStanding league;
    private Integer teamId;
    private String teamName;
    private String teamLogo;
    private Integer position;
    private Integer points;
    private Integer goalsDiff;

    @Embedded
    private TeamStatistics all;

    private OffsetDateTime lastUpdate;
}
