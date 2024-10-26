package com.app.waki.division.infrastructure.controller;

import com.app.waki.division.application.DivisionRecalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/division")
public class DivisionController {

    private final DivisionRecalculationService recalculationService;

    @PostMapping("/update")
    public ResponseEntity<String> updateRankingsAndDivisions() {
        recalculationService.recalculateDivisionsAndRankings();
        return ResponseEntity.ok("Update ranking and divisions triggered successfully.");
    }
}
