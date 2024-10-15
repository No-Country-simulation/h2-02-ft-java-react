package com.app.waki.prediction.infrastructure.controller;

import com.app.waki.prediction.application.dto.PredictionDetailsDto;
import com.app.waki.prediction.application.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/prediction")
public class PredictionController {

    private final PredictionService service;
    @GetMapping("/{profileId}")
    public ResponseEntity<List<PredictionDetailsDto>> getAllPredictionsByProfileId(@PathVariable UUID profileId) {

        return ResponseEntity.ok(service.getAllPredictionsByProfileId(profileId));
    }
}
