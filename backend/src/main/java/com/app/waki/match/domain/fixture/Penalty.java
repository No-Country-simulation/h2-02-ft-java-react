package com.app.waki.match.domain.fixture;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Embeddable
@AllArgsConstructor
@Data
public class Penalty {
    private Integer PenaltyHomeGoals;
    private Integer PenaltyAwayGoals;
}
