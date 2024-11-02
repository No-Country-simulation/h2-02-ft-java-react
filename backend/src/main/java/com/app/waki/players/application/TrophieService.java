package com.app.waki.players.application;

import com.app.waki.players.domain.trophies.Trophie;

import java.io.IOException;
import java.util.List;

public interface TrophieService {
    void fetchAndSaveTrophies() throws IOException, InterruptedException;

    List<Trophie> getPlayerTrophieById(Long id);

    List<Trophie> getPlayerTrophiesByIdAndSeason(Long id, String season);
}
