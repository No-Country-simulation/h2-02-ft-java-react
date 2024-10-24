package com.app.waki.match.application;

import com.app.waki.match.domain.fixture.Fixture;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.List;

public interface FixtureService {
    void fetchAndSaveFixtures() throws IOException, InterruptedException;

    List<Fixture> getFixturesByLeagueAndDate(Long leagueId, OffsetDateTime startDate, OffsetDateTime endDate);

//    List<FixtureWithOddsDTO> getFixturesAndOddsByLeagueAndDate(Long leagueId, OffsetDateTime startDate, OffsetDateTime endDate);
}
