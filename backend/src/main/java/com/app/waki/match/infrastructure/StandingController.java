package com.app.waki.match.infrastructure;

import com.app.waki.match.application.servicesImpl.StandingService;
import com.app.waki.match.domain.standings.Standing;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/standing")
public class StandingController {

    private final StandingService standingService;

    @GetMapping("/fetch-standings")
    public String fetchStandings() {
        try {
            standingService.fetchAndSaveStandings();
            return "Standing data fetched and saved successfully!";
        } catch (Exception e) {
            return "Failed to fetch Standing data: " + e.getMessage();
        }
    }

    @GetMapping("/{leagueId}")
    public ResponseEntity<List<Standing>> getStandingsByLeagueId(@PathVariable Long leagueId) {
        List<Standing> standings = standingService.getStandingsByLeagueId(leagueId);
        if (standings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(standings);
    }

}
