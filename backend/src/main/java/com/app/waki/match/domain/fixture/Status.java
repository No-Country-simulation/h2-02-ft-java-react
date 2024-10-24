package com.app.waki.match.domain.fixture;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Status {
    private String longStatus;
    private String shortStatus;
    private int elapsed;
    private String extra;
}
