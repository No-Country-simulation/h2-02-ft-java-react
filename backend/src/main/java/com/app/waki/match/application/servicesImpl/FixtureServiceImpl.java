package com.app.waki.match.application.servicesImpl;


import com.app.waki.match.application.FixtureService;
import com.app.waki.match.domain.fixture.*;
import com.app.waki.match.domain.league.League;
import com.app.waki.match.domain.league.LeagueRepository;
import com.app.waki.match.domain.odds.OddsRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FixtureServiceImpl implements FixtureService {

    private final FixtureRepository fixtureRepository;
    private final LeagueRepository leagueRepository;
    private final OddsRepository oddsRepository;

    @Value("${API_TOKEN}")
    private String apiToken;

    @Override
    public void fetchAndSaveFixtures() throws IOException, InterruptedException {
        // Lista de IDs de ligas
        List<Long> leagueIds = List.of(39L, 140L, 2L, 78L, 13L, 128L, 71L);

        // Procesa cada liga individualmente
        for (Long leagueId : leagueIds) {
            // Construye la solicitud para la liga actual
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://v3.football.api-sports.io/fixtures?season=2024&from=2024-10-01&to=2024-12-31&league=" + leagueId))
                    .header("x-rapidapi-key", apiToken)
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();

            // Envía la solicitud y recibe la respuesta
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("API Response for League " + leagueId + ": " + response.body()); // Imprime la respuesta

            // Procesa el JSON
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.body());

            // Extrae la lista de fixtures
            JsonNode fixturesNode = rootNode.path("response");

            // Mapea el JSON a la entidad Fixture
            List<Fixture> fixtures = new ArrayList<>();
            fixturesNode.forEach(fixtureNode -> {
                Fixture fixture = new Fixture();
                fixture.setId(fixtureNode.path("fixture").path("id").asLong());
                fixture.setReferee(fixtureNode.path("fixture").path("referee").asText());
                fixture.setTimezone(fixtureNode.path("fixture").path("timezone").asText());
                fixture.setDate(OffsetDateTime.parse(fixtureNode.path("fixture").path("date").asText()));
                fixture.setTimestamp(fixtureNode.path("fixture").path("timestamp").asLong());

                // Mapea Periods
                JsonNode periodsNode = fixtureNode.path("fixture").path("periods");
                fixture.setPeriods(new Periods());
                fixture.getPeriods().setFirstTime(periodsNode.path("first").asLong());
                fixture.getPeriods().setSecondTime(periodsNode.path("second").asLong());

                // Busca la liga correspondiente en la base de datos y la asigna
                League league = leagueRepository.findById(leagueId)
                        .orElseThrow(() -> new RuntimeException("League not found"));
                fixture.setLeague(league);  // Asigna la liga

                // Mapea Venue
                JsonNode venueNode = fixtureNode.path("fixture").path("venue");
                Venue venue = new Venue();
                venue.setId(venueNode.path("id").asLong());
                venue.setVenueName(venueNode.path("name").asText());
                venue.setCity(venueNode.path("city").asText());
                fixture.setVenue(venue);

                // Mapea Status
                JsonNode statusNode = fixtureNode.path("fixture").path("status");
                Status status = new Status();
                status.setLongStatus(statusNode.path("long").asText());
                status.setShortStatus(statusNode.path("short").asText());
                status.setElapsed(statusNode.path("elapsed").asInt());
                status.setExtra(statusNode.path("extra").isNull() ? null : statusNode.path("extra").asText());
                fixture.setStatus(status);

                // Mapea Teams
                JsonNode teamsNode = fixtureNode.path("teams");
                Teams teams = new Teams();

                JsonNode homeTeamNode = teamsNode.path("home");
                Team homeTeam = new Team();
                homeTeam.setId(homeTeamNode.path("id").asLong());
                homeTeam.setTeamName(homeTeamNode.path("name").asText());
                homeTeam.setTeamLogo(homeTeamNode.path("logo").asText());
                homeTeam.setWinner(homeTeamNode.path("winner").asBoolean());
                teams.setHome(homeTeam);

                JsonNode awayTeamNode = teamsNode.path("away");
                Team awayTeam = new Team();
                awayTeam.setId(awayTeamNode.path("id").asLong());
                awayTeam.setTeamName(awayTeamNode.path("name").asText());
                awayTeam.setTeamLogo(awayTeamNode.path("logo").asText());
                awayTeam.setWinner(awayTeamNode.path("winner").asBoolean());
                teams.setAway(awayTeam);

                fixture.setTeams(teams);

                // Mapea Goals
                JsonNode goalsNode = fixtureNode.path("goals");
                Goals goals = new Goals();
                goals.setHomeGoals(goalsNode.path("home").asInt());
                goals.setAwayGoals(goalsNode.path("away").asInt());
                fixture.setGoals(goals);

                // Agrega el fixture a la lista
                fixtures.add(fixture);
            });

            // Guarda los fixtures de la liga actual en la base de datos
            fixtureRepository.saveAll(fixtures);
        }
    }

    @Override
    @Transactional
    public List<Fixture> getFixturesByLeagueAndDate(Long leagueId, OffsetDateTime startDate, OffsetDateTime endDate) {
        return fixtureRepository.findByLeagueAndDateBetween(leagueId, startDate, endDate);
    }

    @Override
    @Transactional
    public List<Fixture> getFixturesByDate(OffsetDateTime startDate, OffsetDateTime endDate) {
        // Llama al repositorio para obtener los fixtures en la fecha especificada
        return fixtureRepository.findByDateBetween(startDate, endDate);
    }

}