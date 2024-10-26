package com.app.waki.match.domain.odds;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Embeddable
@Data
@NoArgsConstructor
public class FixtureOdds {
    private Long fixtureId;
    private String timezone;
    private LocalDateTime date;
    private Long timestamp;
}