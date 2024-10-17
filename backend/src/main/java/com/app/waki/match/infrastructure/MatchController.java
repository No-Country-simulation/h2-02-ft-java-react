package com.app.waki.match.infrastructure;

import com.app.waki.match.application.MatchAreaCompetitionDTO;
import com.app.waki.match.application.MatchService;
import com.app.waki.match.domain.Match;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/match")
public class MatchController {

    private final MatchService service;

    public MatchController(MatchService service) {
        this.service = service;
    }

    @GetMapping("/ligasUpdate")
    @Operation(summary = "Esto se usa para mantener actualizada la base de datos cada cierto tiempo (SOLO TESTEO)")
    public ResponseEntity<Void> updateLigas() throws IOException, InterruptedException {
        service.UpdateMatches();  // Solo actualiza y guarda en la base de datos
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getMatches/{code}")
    @Operation(summary = "Esto se utiliza para traer los partidos de la Liga(code: PL,CL,CLI,ECL) que se ingrese, desde hoy hasta 5 dias posteriores")
    public ResponseEntity<List<Match>> getLigasMatches(@PathVariable("code") String code) {
        List<Match> matches = service.getMatchesWithinFiveDays(code.toUpperCase());
        return new ResponseEntity<>(matches, HttpStatus.OK);
    }

    @GetMapping("/area-competition")
    @Operation(summary = "Esto se utiliza para traer las ligas disponibles actualmente en la base de datos")
    public ResponseEntity<List<MatchAreaCompetitionDTO>> getMatchesWithAreaAndCompetition() {
        List<MatchAreaCompetitionDTO> matches = service.getMatchesWithAreaAndCompetition();
        return new ResponseEntity<>(matches, HttpStatus.OK);
    }

    @GetMapping("/getMatchesToday")
    @Operation(summary = "Esto se utiliza para traer los partidos de la liga(code: PL,CL,CLI,ECL) y el dia (formato: 2024-10-19) que se ingrese")
    public ResponseEntity<List<Match>> getLigasMatches(@RequestParam("code") String code, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Match> matches = service.getMatchesToday(code.toUpperCase(), date);
        return new ResponseEntity<>(matches, HttpStatus.OK);
    }
}
