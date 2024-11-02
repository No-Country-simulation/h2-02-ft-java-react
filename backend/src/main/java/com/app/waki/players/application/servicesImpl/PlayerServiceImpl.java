package com.app.waki.players.application.servicesImpl;

import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.players.application.PlayerService;
import com.app.waki.players.application.dto.PlayerProfileDTO;
import com.app.waki.players.application.dto.PlayerProfileStatsDTO;
import com.app.waki.players.application.dto.PlayerProfileStatsTrophiesDTO;
import com.app.waki.players.domain.player.*;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;
    private final TrophieRepository trophieRepository;

    @Value("${API_TOKEN}")
    private String apiToken;

    @Override
    @Async
    @Transactional
    @Scheduled(cron = "0 54 23 * * *") // Todos los días a las 23:50
    public void fetchAndSavePlayers() throws IOException, InterruptedException {
        List<Long> playerIds = List.of(154L, 874L, 1100L);
        //List<Long> seasons = List.of(2002L, 2003L, 2004L,2005L,2006L);
        List<Long> seasons = List.of(2002L, 2003L, 2004L, 2005L, 2006L, 2007L, 2008L, 2009L, 2010L,
                2011L, 2012L, 2013L, 2014L, 2015L, 2016L, 2017L, 2018L, 2019L, 2020L, 2021L, 2022L, 2023L, 2024L);

        ObjectMapper objectMapper = new ObjectMapper();

        for (Long playerId : playerIds) {
            for (Long season : seasons) {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("https://v3.football.api-sports.io/players?id=" + playerId + "&season=" + season))
                        .header("x-rapidapi-key", apiToken)
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();

                HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    JsonNode rootNode = objectMapper.readTree(response.body());
                    JsonNode responseNode = rootNode.path("response");

                    if (responseNode.isArray() && responseNode.size() > 0) {
                        JsonNode playerNode = responseNode.get(0).path("player");

                        // Verifica si el jugador ya existe
                        Long profileId = playerNode.path("id").asLong();
                        if (playerRepository.existsByPlayer_ProfileId(profileId)) {
                            System.out.println("Player with profileId " + profileId + " already exists. Adding new statistics.");
                        } else {
                            // Si no existe, crea el jugador y el perfil del jugador
                            Player player = new Player();
                            PlayerProfile playerProfile = new PlayerProfile(
                                    profileId,
                                    playerNode.path("name").asText(),
                                    playerNode.path("firstname").asText(),
                                    playerNode.path("lastname").asText(),
                                    playerNode.path("age").asInt(),
                                    new Birth(
                                            playerNode.path("birth").path("date").asText(),
                                            playerNode.path("birth").path("place").asText(),
                                            playerNode.path("birth").path("country").asText()
                                    ),
                                    playerNode.path("nationality").asText(),
                                    playerNode.path("injured").asBoolean(),
                                    playerNode.path("photo").asText()
                            );
                            player.setPlayer(playerProfile);
                            playerRepository.save(player);
                        }

                        // Obtiene las estadísticas
                        JsonNode statisticsNode = responseNode.get(0).path("statistics");
                        if (statisticsNode.isArray() && statisticsNode.size() > 0) {
                            for (JsonNode statNode : statisticsNode) {
                                Statistics statistics = new Statistics();

                                statistics.setIdPlayer(profileId);

                                // Configura el equipo
                                statistics.setTeam(new Team(
                                        statNode.path("team").path("name").asText(),
                                        statNode.path("team").path("logo").asText()
                                ));

                                // Configura la liga
                                statistics.setLeague(new League(
                                        statNode.path("league").path("name").asText(),
                                        statNode.path("league").path("logo").asText(),
                                        statNode.path("league").path("season").asText()
                                ));

                                // Configura los juegos
                                statistics.setGames(new Games(
                                        statNode.path("games").path("appearences").asInt(),
                                        statNode.path("games").path("minutes").asInt(),
                                        statNode.path("games").path("position").asText(),
                                        statNode.path("games").path("rating").asText()
                                ));

                                // Configura los goles
                                statistics.setGoals(new Goals(
                                        statNode.path("goals").path("total").asInt(),
                                        statNode.path("goals").path("assists").asInt(),
                                        statNode.path("goals").path("saves").isNull() ? null : statNode.path("goals").path("saves").asInt()
                                ));

                                // Configura las tarjetas
                                statistics.setCards(new Cards(
                                        statNode.path("cards").path("yellow").asInt(),
                                        statNode.path("cards").path("red").asInt()
                                ));

                                // Agrega cada estadística al jugador
                                playerRepository.findByPlayer_ProfileId(profileId).ifPresent(player -> {
                                    if (player.getStatistics() == null) {
                                        player.setStatistics(new ArrayList<>());
                                    }
                                    player.getStatistics().add(statistics);
                                    playerRepository.save(player);
                                });
                            }
                        } else {
                            System.out.println("No statistics found for player " + profileId + " in season " + season);
                        }
                    } else {
                        System.out.println("No data found in API response for player " + playerId + " and season " + season);
                    }
                } else {
                    System.out.println("Failed to fetch data for player " + playerId + " and season " + season + ". Status code: " + response.statusCode());
                }
            }
        }
    }

    @Override
    @Transactional
    public List<PlayerProfileDTO> getAllPlayerProfiles() {
        List<Player> players = playerRepository.findAll();
        return players.stream()
                .map(player -> new PlayerProfileDTO(
                        player.getPlayer().getProfileId(),
                        player.getPlayer().getName(),
                        player.getPlayer().getFirstname(),
                        player.getPlayer().getLastname(),
                        player.getPlayer().getAge(),
                        player.getPlayer().getBirth(),
                        player.getPlayer().getNationality(),
                        player.getPlayer().isInjured(),
                        player.getPlayer().getPhoto()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<PlayerProfileStatsDTO> getAllPlayerProfilesWithStats() {
        List<Player> players = playerRepository.findAll();

        return players.stream().map(player -> {
            // Calcular los totales
            int totalGoals = 0;
            int totalAppearances = 0;
            int totalMinutes = 0;
            int totalAssists = 0;
            int totalYellowCards = 0;
            int totalRedCards = 0;

            for (Statistics stat : player.getStatistics()) {
                if (stat.getGoals() != null) {
                    totalGoals += stat.getGoals().getTotalGoals();
                    totalAssists += stat.getGoals().getAssists();
                }
                if (stat.getGames() != null) {
                    totalAppearances += stat.getGames().getAppearences();
                    totalMinutes += stat.getGames().getMinutes();
                }
                if (stat.getCards() != null) {
                    totalYellowCards += stat.getCards().getYellow();
                    totalRedCards += stat.getCards().getRed();
                }
            }

            return new PlayerProfileStatsDTO(
                    player.getPlayer().getProfileId(),
                    player.getPlayer().getName(),
                    player.getPlayer().getFirstname(),
                    player.getPlayer().getLastname(),
                    player.getPlayer().getAge(),
                    player.getPlayer().getBirth(),
                    player.getPlayer().getNationality(),
                    player.getPlayer().isInjured(),
                    player.getPlayer().getPhoto(),
                    totalGoals,
                    totalAppearances,
                    totalMinutes,
                    totalAssists,
                    totalYellowCards,
                    totalRedCards
            );
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PlayerProfileStatsDTO getPlayerProfileStatsById(Long id) {
        Optional<Player> playerOpt = playerRepository.findByPlayer_ProfileId(id);
        return playerOpt.map(player -> {
            // Calcular los totales
            int totalGoals = 0;
            int totalAppearances = 0;
            int totalMinutes = 0;
            int totalAssists = 0;
            int totalYellowCards = 0;
            int totalRedCards = 0;

            for (Statistics stat : player.getStatistics()) {
                if (stat.getGoals() != null) {
                    totalGoals += stat.getGoals().getTotalGoals();
                    totalAssists += stat.getGoals().getAssists();
                }
                if (stat.getGames() != null) {
                    totalAppearances += stat.getGames().getAppearences();
                    totalMinutes += stat.getGames().getMinutes();
                }
                if (stat.getCards() != null) {
                    totalYellowCards += stat.getCards().getYellow();
                    totalRedCards += stat.getCards().getRed();
                }
            }

            return new PlayerProfileStatsDTO(
                    player.getPlayer().getProfileId(),
                    player.getPlayer().getName(),
                    player.getPlayer().getFirstname(),
                    player.getPlayer().getLastname(),
                    player.getPlayer().getAge(),
                    player.getPlayer().getBirth(),
                    player.getPlayer().getNationality(),
                    player.getPlayer().isInjured(),
                    player.getPlayer().getPhoto(),
                    totalGoals,
                    totalAppearances,
                    totalMinutes,
                    totalAssists,
                    totalYellowCards,
                    totalRedCards
            );
        }).orElseThrow(() -> new EntityNotFoundException("Player not found with profile ID: " + id));
    }

    @Override
    @Transactional
    public PlayerProfileStatsTrophiesDTO getPlayerProfileStatsAndTrophiesById(Long id) {
        Optional<Player> playerOpt = playerRepository.findByPlayer_ProfileId(id);
        return playerOpt.map(player -> {
            // Calcular los totales
            int totalGoals = 0;
            int totalAppearances = 0;
            int totalMinutes = 0;
            int totalAssists = 0;
            int totalYellowCards = 0;
            int totalRedCards = 0;

            for (Statistics stat : player.getStatistics()) {
                if (stat.getGoals() != null) {
                    totalGoals += stat.getGoals().getTotalGoals();
                    totalAssists += stat.getGoals().getAssists();
                }
                if (stat.getGames() != null) {
                    totalAppearances += stat.getGames().getAppearences();
                    totalMinutes += stat.getGames().getMinutes();
                }
                if (stat.getCards() != null) {
                    totalYellowCards += stat.getCards().getYellow();
                    totalRedCards += stat.getCards().getRed();
                }
            }

            // Obtener los trofeos del jugador usando el profileId
            List<Trophie> trophies = trophieRepository.findByPlayerId(id);

            return new PlayerProfileStatsTrophiesDTO(
                    player.getPlayer().getProfileId(),
                    player.getPlayer().getName(),
                    player.getPlayer().getFirstname(),
                    player.getPlayer().getLastname(),
                    player.getPlayer().getAge(),
                    player.getPlayer().getBirth(),
                    player.getPlayer().getNationality(),
                    player.getPlayer().isInjured(),
                    player.getPlayer().getPhoto(),
                    totalGoals,
                    totalAppearances,
                    totalMinutes,
                    totalAssists,
                    totalYellowCards,
                    totalRedCards,
                    trophies
            );
        }).orElseThrow(() -> new EntityNotFoundException("Player not found with profile ID: " + id));
    }

    @Override
    @Transactional
    public PlayerProfileStatsDTO getPlayerProfileStatsByIdAndYear(Long id, String season) {
        Optional<Player> playerOpt = playerRepository.findByPlayer_ProfileId(id);
        return playerOpt.map(player -> {
            // Inicializar los totales
            int totalGoals = 0;
            int totalAppearances = 0;
            int totalMinutes = 0;
            int totalAssists = 0;
            int totalYellowCards = 0;
            int totalRedCards = 0;

            // Filtrar estadísticas por la temporada especificada
            for (Statistics stat : player.getStatistics()) {
                // Comparación parcial de la temporada para capturar casos como "2015-2016"
                if (stat.getLeague().getSeason() != null && stat.getLeague().getSeason().contains(season)) {
                    if (stat.getGoals() != null) {
                        totalGoals += stat.getGoals().getTotalGoals();
                        totalAssists += stat.getGoals().getAssists();
                    }
                    if (stat.getGames() != null) {
                        totalAppearances += stat.getGames().getAppearences();
                        totalMinutes += stat.getGames().getMinutes();
                    }
                    if (stat.getCards() != null) {
                        totalYellowCards += stat.getCards().getYellow();
                        totalRedCards += stat.getCards().getRed();
                    }
                }
            }

            return new PlayerProfileStatsDTO(
                    player.getPlayer().getProfileId(),
                    player.getPlayer().getName(),
                    player.getPlayer().getFirstname(),
                    player.getPlayer().getLastname(),
                    player.getPlayer().getAge(),
                    player.getPlayer().getBirth(),
                    player.getPlayer().getNationality(),
                    player.getPlayer().isInjured(),
                    player.getPlayer().getPhoto(),
                    totalGoals,
                    totalAppearances,
                    totalMinutes,
                    totalAssists,
                    totalYellowCards,
                    totalRedCards
            );
        }).orElseThrow(() -> new EntityNotFoundException("Player not found with profile ID: " + id));
    }
}
