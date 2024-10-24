package com.app.waki.match.domain.standings;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class TeamStatistics {
    private Integer played;
    private Integer win;
    private Integer draw;
    private Integer lose;
}
