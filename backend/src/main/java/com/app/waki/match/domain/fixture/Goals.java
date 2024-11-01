package com.app.waki.match.domain.fixture;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Goals {
    private int homeGoals;
    private int awayGoals;
}
