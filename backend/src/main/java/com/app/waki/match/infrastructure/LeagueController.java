package com.app.waki.match.infrastructure;

import com.app.waki.match.application.LeagueService;
import com.app.waki.match.domain.league.League;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/league")
public class LeagueController {

    @Autowired
    private final LeagueService leagueService;

    @GetMapping("/fetch-league")
    public String fetchLeague() {
        try {
            leagueService.fetchAndSaveLeague();
            return "League data fetched and saved successfully!";
        } catch (Exception e) {
            return "Failed to fetch league data: " + e.getMessage();
        }
    }

    // Nuevo endpoint para obtener todas las ligas
    @GetMapping("/allLeagues")
    public List<League> getAllLeagues() {
        return leagueService.getAllLeagues();
    }
}
