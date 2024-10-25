package com.app.waki.match.application;

import com.app.waki.match.domain.fixture.Fixture;
import com.app.waki.match.domain.odds.Odds;
import lombok.Data;

import java.util.List;

@Data
public class FixtureWithOddsDTO {
    private final Fixture fixture;
    private final List<Odds> odds;
}
