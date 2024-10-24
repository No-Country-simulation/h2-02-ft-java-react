package com.app.waki.match.infrastructure;

import com.app.waki.match.application.FixtureService;
import com.app.waki.match.application.FixtureWithOddsDTO;
import com.app.waki.match.application.OddsService;
import com.app.waki.match.domain.fixture.Fixture;
import com.app.waki.match.domain.odds.Odds;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fixture")
public class FixtureController {

    @Autowired
    private final FixtureService fixtureService;

    @Autowired
    private final OddsService oddsService;

    @GetMapping("/fetch-fixture")
    public String fetchFixture() {
        try {
            fixtureService.fetchAndSaveFixtures();
            return "Fixture data fetched and saved successfully!";
        } catch (Exception e) {
            return "Failed to fetch fixture data: " + e.getMessage();
        }
    }

    @GetMapping("/getFixtureToday")
    public ResponseEntity<?> getFixturesByDateAndLeague(@RequestParam Long leagueId, @RequestParam String date) {
        try {
            OffsetDateTime startDate = OffsetDateTime.parse(date + "T00:00:00Z");
            OffsetDateTime endDate = OffsetDateTime.parse(date + "T23:59:59Z");
            List<Fixture> fixtures = fixtureService.getFixturesByLeagueAndDate(leagueId, startDate, endDate);
            if (fixtures.isEmpty()) {
                return ResponseEntity.ok("No hay partidos para esta día");
            }
            return ResponseEntity.ok(fixtures);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching fixtures: " + e.getMessage());
        }
    }

    @GetMapping("/getFixtureAndOddsToday")
    public ResponseEntity<?> getFixturesAndOddsByDateAndLeague(@RequestParam Long leagueId, @RequestParam String date) {
        try {
            OffsetDateTime startDate = OffsetDateTime.parse(date + "T00:00:00Z");
            OffsetDateTime endDate = OffsetDateTime.parse(date + "T23:59:59Z");

            // 1. Obtener los fixtures por liga y fecha
            List<Fixture> fixtures = fixtureService.getFixturesByLeagueAndDate(leagueId, startDate, endDate);
            if (fixtures.isEmpty()) {
                return ResponseEntity.ok("No hay partidos");
            }

            // 2. Obtener los fixtureIds de los partidos
            List<Long> fixtureIds = fixtures.stream()
                    .map(Fixture::getId)
                    .collect(Collectors.toList());

            // 3. Obtener los odds correspondientes a los fixtureIds
            Map<Long, List<Odds>> oddsByFixtureId = oddsService.getOddsByFixtureIds(fixtureIds);

            // 4. Combinar los fixtures con sus odds
            List<FixtureWithOddsDTO> fixturesWithOdds = fixtures.stream()
                    .map(fixture -> new FixtureWithOddsDTO(fixture, oddsByFixtureId.getOrDefault(fixture.getId(), List.of())))
                    .collect(Collectors.toList());

            // 5. Devolver la respuesta
            return ResponseEntity.ok(fixturesWithOdds);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching fixtures and odds: " + e.getMessage());
        }
    }
}
