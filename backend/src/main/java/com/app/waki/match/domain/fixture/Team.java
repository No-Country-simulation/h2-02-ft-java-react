package com.app.waki.match.domain.fixture;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Id;
import lombok.Data;

@Embeddable
@Data
public class Team {
    private Long id;
    private String teamName;
    private String teamLogo;
    private boolean winner;
}