package com.app.waki.match.domain.fixture;

import com.app.waki.match.domain.league.League;
import jakarta.persistence.*;
import lombok.Data;

import java.time.OffsetDateTime;

@Entity
@Data
public class Fixture {
    @Id
    private Long id;

    private String referee;
    private String timezone;
    private OffsetDateTime date;
    private Long timestamp;

    @Embedded
    private Periods periods;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "league_id", nullable = false)
    private League league; // Relación con la entidad League

    @Embedded
    private Venue venue;

    @Embedded
    private Status status;

    @Embedded
    private Teams teams;

    @Embedded
    private Goals goals;

//    @Embedded
//    private Score score;
}
