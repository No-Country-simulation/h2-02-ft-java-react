package com.app.waki.match.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "odds")
public class Odds {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double home_team;
    private Double away_team;
    private Double draw;
}
