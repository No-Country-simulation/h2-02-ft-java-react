package com.app.waki.match.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "score")
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

    @OneToOne(cascade = CascadeType.PERSIST) // Asegúrate de que esta relación tenga el tipo de cascada correcto
    private TimeScore fullTime;

    @OneToOne(cascade = CascadeType.PERSIST)
    private TimeScore halfTime;
}