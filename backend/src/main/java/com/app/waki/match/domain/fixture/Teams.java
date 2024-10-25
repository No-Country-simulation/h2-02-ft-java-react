package com.app.waki.match.domain.fixture;

import jakarta.persistence.*;
import lombok.Data;

@Embeddable
@Data
public class Teams {
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "id", column = @Column(name = "team_home_id")),
            @AttributeOverride(name = "teamName", column = @Column(name = "team_home_name")),
            @AttributeOverride(name = "teamLogo", column = @Column(name = "team_home_logo")),
            @AttributeOverride(name = "winner", column = @Column(name = "team_home_winner"))
    })
    private Team home;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "id", column = @Column(name = "team_away_id")),
            @AttributeOverride(name = "teamName", column = @Column(name = "team_away_name")),
            @AttributeOverride(name = "teamLogo", column = @Column(name = "team_away_logo")),
            @AttributeOverride(name = "winner", column = @Column(name = "team_away_winner"))
    })
    private Team away;
}
