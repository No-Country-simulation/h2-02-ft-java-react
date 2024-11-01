package com.app.waki.players.application;

import com.app.waki.players.application.dto.PlayerProfileDTO;
import com.app.waki.players.application.dto.PlayerProfileStatsDTO;
import com.app.waki.players.application.dto.PlayerProfileStatsTrophiesDTO;

import java.io.IOException;
import java.util.List;

public interface PlayerService {

    void fetchAndSavePlayers() throws IOException, InterruptedException;

    List<PlayerProfileDTO> getAllPlayerProfiles();

    List<PlayerProfileStatsDTO> getAllPlayerProfilesWithStats();

    PlayerProfileStatsDTO getPlayerProfileStatsById(Long id);

    PlayerProfileStatsTrophiesDTO getPlayerProfileStatsAndTrophiesById(Long id);

    PlayerProfileStatsDTO getPlayerProfileStatsByIdAndYear(Long id, String season);
}
