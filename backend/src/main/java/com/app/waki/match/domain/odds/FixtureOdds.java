package com.app.waki.match.domain.odds;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class FixtureOdds {
    private Long fixtureId;
    private String timezone;
    private String date;
    private Long timestamp;
}