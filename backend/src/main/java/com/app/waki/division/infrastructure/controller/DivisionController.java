package com.app.waki.division.infrastructure.controller;

import com.app.waki.division.application.DivisionRecalculationService;
import com.app.waki.division.application.DivisionServiceImpl;
import com.app.waki.division.application.dto.UserRankingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/division")
public class DivisionController {

    private final DivisionRecalculationService recalculationService;
    private final DivisionServiceImpl divisionService;

    @PostMapping("/update")
    public ResponseEntity<String> updateRankingsAndDivisions() {
        recalculationService.recalculateDivisionsAndRankings();
        return ResponseEntity.ok("Update ranking and divisions triggered successfully.");
    }

    @GetMapping("/userRanking/{userRankingId}")
    public ResponseEntity<UserRankingDto> getUserRankingById(@PathVariable UUID userRankingId){
        return ResponseEntity.ok(divisionService.getUserRanking(userRankingId));
    }
}
