package com.app.waki.match.domain.standings;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class LeagueStanding {

    @Column(nullable = false)
    private Long leagueId;

    @Column(nullable = false)
    private String leagueName;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String leagueLogo;

    @Column(nullable = false)
    private Integer season;
}
