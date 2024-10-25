package com.app.waki.match.domain.fixture;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Embeddable
@AllArgsConstructor
@Data
public class Halftime {
    private Integer HalftimeHomeGoals;
    private Integer HalftimeAwayGoals;

}
