package com.app.waki.match.domain.league;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.time.LocalDate;

@Embeddable
@Data
public class Season {
    private int year;
    private LocalDate start;
    private LocalDate end;
    private boolean current;
}
