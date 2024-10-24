package com.app.waki.match.domain.league;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Country {
    private String name;
    private String code;
    private String flag;
}
