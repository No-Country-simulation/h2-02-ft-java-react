package com.app.waki.players.domain.player;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Goals {
    private Integer totalGoals;
    private Integer assists;
    private Integer saves;
}
