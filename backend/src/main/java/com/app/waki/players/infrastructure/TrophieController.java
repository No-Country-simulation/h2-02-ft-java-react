package com.app.waki.players.infrastructure;


import com.app.waki.players.application.TrophieService;
import com.app.waki.players.domain.trophies.Trophie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trophie")
public class TrophieController {

    @Autowired
    private final TrophieService trophieService;

    @GetMapping("/fetch-trophie")
    public String fetchPlayer() {
        try {
            trophieService.fetchAndSaveTrophies();
            return "Trophie data fetched and saved successfully!";
        } catch (Exception e) {
            return "Failed to fetch Trophie data: " + e.getMessage();
        }
    }

    //Trae los logros totales de un jugador especifico
    @GetMapping("/playerTrophie/{id}")
    public ResponseEntity<List<Trophie>> getPlayerTrophies(@PathVariable Long id) {
        List<Trophie> logros = trophieService.getPlayerTrophieById(id);
        return ResponseEntity.ok(logros);
    }

    //Trae los logros totales de un jugador y años especifico
    @GetMapping("/playerTrophie/{id}/{season}")
    public ResponseEntity<List<Trophie>> getPlayerTrophiesByYear(@PathVariable Long id, @PathVariable String season) {
        List<Trophie> logros = trophieService.getPlayerTrophiesByIdAndSeason(id, season);
        return ResponseEntity.ok(logros);
    }

}
