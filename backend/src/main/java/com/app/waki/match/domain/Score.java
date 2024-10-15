package com.app.waki.match.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String winner;
    private String duration;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "full_time_score_id")
    private TimeScore fullTime;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "half_time_score_id")
    private TimeScore halfTime;
}