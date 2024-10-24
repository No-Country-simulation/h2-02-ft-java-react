package com.app.waki.match.application.servicesImpl;

import com.app.waki.match.domain.standings.Standing;

import java.io.IOException;
import java.util.List;

public interface StandingService {
    void fetchAndSaveStandings() throws IOException, InterruptedException;

    List<Standing> getStandingsByLeagueId(Long leagueId);
}
