package com.app.waki.match.domain.fixture;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Goals {
    private int homeGoals;
    private int awayGoals;
}
