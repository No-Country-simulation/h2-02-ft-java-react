package com.app.waki.match.application.servicesImpl;

import com.app.waki.match.application.LeagueService;
import com.app.waki.match.domain.league.League;
import com.app.waki.match.domain.league.LeagueRepository;
import com.app.waki.match.domain.league.Season;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeagueServiceImpl implements LeagueService {

    private final LeagueRepository leagueRepository;

    @Value("${API_TOKEN}")
    private String apiToken;

    public void fetchAndSaveLeague() throws IOException, InterruptedException {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://v3.football.api-sports.io/leagues?id=39&season=2024"))
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
        league.setName(leagueNode.path("name").asText());
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

    // Nuevo método para obtener todas las ligas
    @Override
    @Transactional
    public List<League> getAllLeagues() {
        return leagueRepository.findAll();
    }
}
