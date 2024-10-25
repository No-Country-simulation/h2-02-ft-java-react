package com.app.waki.match.domain.fixture;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Periods {
    private Long firstTime;
    private Long secondTime;
}
