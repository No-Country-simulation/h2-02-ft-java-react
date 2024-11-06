package com.app.waki.players.application.servicesImpl;

import com.app.waki.players.application.TrophieService;
import com.app.waki.players.domain.player.Player;
import com.app.waki.players.domain.player.PlayerRepository;
import com.app.waki.players.domain.trophies.Trophie;
import com.app.waki.players.domain.trophies.TrophieRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrophieServiceImpl implements TrophieService {

    private final TrophieRepository trophieRepository;
    private final PlayerRepository playerRepository;

    @Value("${API_TOKEN}")
    private String apiToken;

    @Override
    @Async
    @Transactional
    @Scheduled(cron = "0 30 23 * * *")
    public void fetchAndSaveTrophies() throws IOException, InterruptedException {

        List<Long> playerIds = List.of(154L, 874L, 1100L, 331L, 59L, 2295L, 152L, 28L, 305L);

        for (Long playerId : playerIds) {
            // Busca el jugador en la base de datos
            Optional<Player> playerOptional = playerRepository.findByPlayer_ProfileId(playerId);

            if (playerOptional.isPresent()) {
                Player player = playerOptional.get();
                Long PlayerId = player.getPlayer().getProfileId();

                // Llamada a la API externa para obtener los trofeos
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("https://v3.football.api-sports.io/trophies?player=" + playerId))
                        .header("x-apisports-key", apiToken)
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();

                HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

                // Parsea la respuesta JSON
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.body());
                JsonNode trophiesArray = rootNode.path("response");

                List<Trophie> trophies = new ArrayList<>();
                for (JsonNode trophyNode : trophiesArray) {
                    Trophie trophie = new Trophie();
                    trophie.setPlayerId(PlayerId);
                    trophie.setLeague(trophyNode.path("league").asText());
                    trophie.setPlace(trophyNode.path("place").asText());

                    // Procesa la cadena 'season' para obtener solo el año de inicio y evitar 2022/2023 o 2022 Qatar
                    String season = trophyNode.path("season").asText();
                    String startYear = season.split("/|\\s+")[0]; // Extrae el primer año

                    trophie.setSeason(startYear); // Guarda solo el año inicial

                    trophies.add(trophie);
                }

                // Guarda los trofeos en la base de datos
                trophieRepository.saveAll(trophies);
            }
        }
    }

    @Override
    @Transactional
    public List<Trophie> getPlayerTrophieById(Long id) {
        return trophieRepository.findByPlayerId(id);
    }

    @Override
    @Transactional
    public List<Trophie> getPlayerTrophiesByIdAndSeason(Long playerId, String season) {
        return trophieRepository.findByPlayerIdAndSeason(playerId, season);
    }
}
