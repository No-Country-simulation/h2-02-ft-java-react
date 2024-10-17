package com.app.waki.match.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "matches")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonPropertyOrder({"area", "competition", "season", "id", "utcDate", "status", "venue", "matchday", "stage", "lastUpdated", "homeTeam", "awayTeam", "score", "odds", "referees"})
public class Match {

    @Id
    @JsonProperty("id")
    private Long id;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "area_id")
    private Area area;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "competition_id")
    private Competition competition;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "season_id")
    private Season season;

    @Column(name = "utc_date_time")
    private LocalDateTime utcDate;

    private String status;

    private String venue;

    private Integer matchday;

    private String stage;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "home_team_id")
    private TeamHome homeTeam;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "away_team_id")
    private TeamAway awayTeam;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "score_id")
    private Score score;

    @Column(name = "last_updated")
    private String lastUpdated;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "match_id")
    private List<Referee> referees;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "odds_id")
    private Odds match_odds;

    public void updateFrom(Match other) {
        this.setArea(other.getArea());
        this.setCompetition(other.getCompetition());
        this.setSeason(other.getSeason());
        this.setUtcDate(other.getUtcDate());
        this.setStatus(other.getStatus());
        this.setVenue(other.getVenue());
        this.setMatchday(other.getMatchday());
        this.setStage(other.getStage());
        this.setScore(other.getScore());
        this.setLastUpdated(other.getLastUpdated());
        this.getReferees().clear();
        this.getReferees().addAll(other.getReferees());
    }
}