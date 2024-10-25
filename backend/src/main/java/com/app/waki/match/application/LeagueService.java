package com.app.waki.match.application;

import com.app.waki.match.domain.league.League;

import java.io.IOException;
import java.util.List;

public interface LeagueService {
    void fetchAndSaveLeague() throws IOException, InterruptedException;

    List<League> getAllLeagues();
}
