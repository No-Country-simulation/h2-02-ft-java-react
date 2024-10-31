package com.app.waki.match.domain.fixture;

import com.app.waki.match.domain.FinalResult;
import com.app.waki.match.domain.league.League;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
public class Fixture {
    @Id
    private Long id;

    private String referee;
    private String timezone;
    private LocalDateTime date;
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

    public void setNewGoals(Goals goals){

        this.goals = goals;
    }

    public void setFinalResult(FinalResult result){

        if (result.name().equals("LOCAL")){

            this.teams.getHome().setWinner(true);
        } else if(result.name().equals("AWAY")){
            this.teams.getAway().setWinner(true);
        } else {
            this.teams.getHome().setWinner(false);
            this.teams.getAway().setWinner(false);
        }
    }
}
