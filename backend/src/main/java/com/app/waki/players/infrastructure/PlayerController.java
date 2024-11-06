package com.app.waki.players.infrastructure;

import com.app.waki.players.application.PlayerService;
import com.app.waki.players.application.dto.PlayerProfileDTO;
import com.app.waki.players.application.dto.PlayerProfileStatsDTO;
import com.app.waki.players.application.dto.PlayerProfileStatsTrophiesDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    private final PlayerService playerService;

    @GetMapping("/fetch-player")
    public String fetchPlayer() {
        try {
            playerService.fetchAndSavePlayers();
            return "Player data fetched and saved successfully!";
        } catch (Exception e) {
            return "Failed to fetch Player data: " + e.getMessage();
        }
    }

    //Trae las estadisticas totales de todos los jugadores (TESTEO)
    @GetMapping("/allPlayerProfilesWithStats")
    public List<PlayerProfileStatsDTO> getAllPlayerProfilesWithStats() {
        return playerService.getAllPlayerProfilesWithStats();
    }

    // Nuevo endpoint para obtener solo los perfiles de los jugadores
    @GetMapping("/allPlayersProfiles")
    public List<PlayerProfileDTO> getAllPlayerProfiles() {
        return playerService.getAllPlayerProfiles();
    }

    //Trae las estadisticas y logros totales de un jugador especifico
    @GetMapping("/playerProfileWithStatAndTrophies/{id}")
    public ResponseEntity<PlayerProfileStatsTrophiesDTO> getPlayerByID(@PathVariable Long id) {
        PlayerProfileStatsTrophiesDTO player = playerService.getPlayerProfileStatsAndTrophiesById(id);
        return ResponseEntity.ok(player);
    }

    //Trae las estadisticas de un año y jugador especifico
    @GetMapping("/playerProfileWithStat/{id}/{season}")
    public ResponseEntity<?> getPlayerStatsByYear(@PathVariable Long id, @PathVariable String season) {
        PlayerProfileStatsDTO playerStats = playerService.getPlayerProfileStatsByIdAndYear(id, season);

        // Verificar si todos los valores son 0, lo que indicaría que no hay estadísticas para la temporada
        if (playerStats.getTotalGoals() == 0 &&
                playerStats.getTotalAppearances() == 0 &&
                playerStats.getTotalMinutes() == 0 &&
                playerStats.getTotalAssists() == 0 &&
                playerStats.getTotalYellowCards() == 0 &&
                playerStats.getTotalRedCards() == 0) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay estadísticas para la temporada " + season);
        }

        return ResponseEntity.ok(playerStats);
    }

    //Trae todas las estadisticas totales de un jugador
    @GetMapping("/playerProfileWithStat/{id}")
    public ResponseEntity<PlayerProfileStatsDTO> getPlayerById(@PathVariable Long id) {
        PlayerProfileStatsDTO player = playerService.getPlayerProfileStatsById(id);
        return ResponseEntity.ok(player);
    }

}
