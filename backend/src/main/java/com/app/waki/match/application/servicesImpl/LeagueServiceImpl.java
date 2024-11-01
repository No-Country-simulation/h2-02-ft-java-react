package com.app.waki.match.application.servicesImpl;

import com.app.waki.match.application.LeagueService;
import com.app.waki.match.domain.league.League;
import com.app.waki.match.domain.league.LeagueRepository;
import com.app.waki.match.domain.league.Season;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeagueServiceImpl implements LeagueService {

    private final LeagueRepository leagueRepository;

    @Value("${API_TOKEN}")
    private String apiToken;

    // Lista de IDs de ligas que quieres obtener
    private static final List<Long> LEAGUE_IDS = List.of(39L, 140L, 2L, 78L, 13L, 128L, 71L, 135L); // Premier League = 39, La Liga = 140

    @Override
    @Transactional
    @Async
    @Scheduled(cron = "0 46 23 * * *") // Todos los días a las 23:48
    public void fetchAndSaveLeague() throws IOException, InterruptedException {
        for (Long leagueId : LEAGUE_IDS) {
            // Construye la solicitud para cada ID de liga
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://v3.football.api-sports.io/leagues?id=" + leagueId + "&season=2024"))
                    .header("x-rapidapi-key", apiToken)
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();

            // Envía la solicitud y recibe la respuesta
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("API Response: " + response.body()); // Imprime la respuesta

            // Procesa el JSON
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.body());

            // Extrae los datos relevantes
            JsonNode leagueNode = rootNode.path("response").get(0).path("league");
            JsonNode countryNode = rootNode.path("response").get(0).path("country");
            JsonNode seasonsNode = rootNode.path("response").get(0).path("seasons");

            // Mapea el JSON a la entidad League
            League league = new League();
            league.setId(leagueNode.path("id").asLong());
            //league.setName(leagueNode.path("name").asText());

            // Establece el nombre de la liga dependiendo del país
            String countryName = countryNode.path("name").asText();
            String leagueName = leagueNode.path("name").asText();

            if ("Brazil".equalsIgnoreCase(countryName) && "Serie A".equalsIgnoreCase(leagueName)) {
                league.setName("Campeonato Brasileño");
            } else if ("Italy".equalsIgnoreCase(countryName) && "Serie A".equalsIgnoreCase(leagueName)) {
                league.setName("Serie A");
            } else {
                league.setName(leagueName);
            }

            league.setType(leagueNode.path("type").asText());
            league.setLogo(leagueNode.path("logo").asText());

            // Mapea Country
            league.getCountry().setName(countryNode.path("name").asText());
            league.getCountry().setCode(countryNode.path("code").asText());
            league.getCountry().setFlag(countryNode.path("flag").asText());

            // Mapea Seasons
            List<Season> seasons = new ArrayList<>();
            seasonsNode.forEach(seasonNode -> {
                Season season = new Season();
                season.setYear(seasonNode.path("year").asInt());
                season.setStart(LocalDate.parse(seasonNode.path("start").asText()));
                season.setEnd(LocalDate.parse(seasonNode.path("end").asText()));
                season.setCurrent(seasonNode.path("current").asBoolean());
                seasons.add(season);
            });
            league.setSeasons(seasons);

            // Guarda en la base de datos
            leagueRepository.save(league);
        }
    }

    // Nuevo método para obtener todas las ligas
    @Override
    @Transactional
    public List<League> getAllLeagues() {
        return leagueRepository.findAll();
    }
}