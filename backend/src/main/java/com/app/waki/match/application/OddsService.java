package com.app.waki.match.application;

import com.app.waki.match.domain.odds.Odds;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface OddsService {
    void fetchAndSaveOdds() throws IOException, InterruptedException;

    List<Odds> getAllOdds();

    Odds getOdd(Long id);

    Map<Long, List<Odds>> getOddsByFixtureIds(List<Long> fixtureIds);
}
