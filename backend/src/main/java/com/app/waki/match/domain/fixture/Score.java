package com.app.waki.match.domain.fixture;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.Data;

@Embeddable
@Data
public class Score {
    @Embedded
    private Halftime halftime;

    @Embedded
    private Fulltime fulltime;

    @Embedded
    private Extratime extratime;

    @Embedded
    private Penalty penalty;
}
