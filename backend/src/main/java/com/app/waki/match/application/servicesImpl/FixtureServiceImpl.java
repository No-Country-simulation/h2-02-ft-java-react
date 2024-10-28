package com.app.waki.match.application.servicesImpl;


import com.app.waki.common.events.FinishedMatchEvent;
import com.app.waki.match.application.FixtureService;
import com.app.waki.match.domain.fixture.*;
import com.app.waki.match.domain.league.League;
import com.app.waki.match.domain.league.LeagueRepository;
import com.app.waki.match.domain.odds.OddsRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FixtureServiceImpl implements FixtureService {

    private final FixtureRepository fixtureRepository;
    private final LeagueRepository leagueRepository;
    private final OddsRepository oddsRepository;
    private final ApplicationEventPublisher publisher;

    @Value("${API_TOKEN}")
    private String apiToken;

    @Override
    @Transactional
    @Scheduled(cron = "0 1 0 * * *") // Todos los días a las 00:01
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
                //fixture.setDate(OffsetDateTime.parse(fixtureNode.path("fixture").path("date").asText()));
                // Extrae la fecha en formato UTC desde el JSON
                String dateString = fixtureNode.path("fixture").path("date").asText();
                // Parsea la fecha en UTC a ZonedDateTime
                ZonedDateTime utcDateTime = ZonedDateTime.parse(dateString);
                // Convierte a la zona horaria de Buenos Aires (UTC-3)
                ZonedDateTime argDateTime = utcDateTime.withZoneSameInstant(ZoneId.of("America/Argentina/Buenos_Aires"));
                LocalDateTime localDateTime = argDateTime.toLocalDateTime();
                fixture.setDate(localDateTime);

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
    public List<Fixture> getFixturesByLeagueAndDate(Long leagueId, LocalDateTime startDate, LocalDateTime endDate) {
        return fixtureRepository.findByLeagueAndDateBetween(leagueId, startDate, endDate);
    }

    @Override
    @Transactional
    public List<Fixture> getFixturesByDate(LocalDateTime startDate, LocalDateTime endDate) {
        // Llama al repositorio para obtener los fixtures en la fecha especificada
        return fixtureRepository.findByDateBetween(startDate, endDate);
    }

    @Override
    @Scheduled(cron = "0 16 23 * * *") // Todos los días a las 00:04
    @Transactional
    public void getMatchFinalizedEvent() {
        // Define el inicio y fin del día actual
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        // 1. Obtener los partidos finalizados en la fecha actual
        List<Fixture> fixtures = fixtureRepository.findByDateBetween(startOfDay, endOfDay);

        for (Fixture fixture : fixtures) {
            Teams teams = fixture.getTeams();

            String result;

            // 2. Determina el resultado basado en el equipo ganador
            if (teams.getHome().isWinner()) {
                result = "LOCAL";
            } else if (teams.getAway().isWinner()) {
                result = "AWAY";
            } else {
                result = "DRAW";
            }

            // 3. Crea el evento FinishedMatchEvent
            FinishedMatchEvent finishedMatchEvent = new FinishedMatchEvent(
                    fixture.getId(),
                    result,
                    fixture.getGoals().getHomeGoals(),
                    fixture.getGoals().getAwayGoals()
            );

            // 4. Publica el evento
            publisher.publishEvent(finishedMatchEvent);
        }
    }

    public Set<Team> getAllTeams() {
        // Obtiene todos los fixtures de la base de datos
        List<Fixture> fixtures = fixtureRepository.findAll();
        // Extrae y agrupa los equipos locales y visitantes sin duplicados
        Set<Team> teams = fixtures.stream()
                .flatMap(fixture -> List.of(fixture.getTeams().getHome(), fixture.getTeams().getAway()).stream())
                .collect(Collectors.toSet());
        return teams;
    }

}