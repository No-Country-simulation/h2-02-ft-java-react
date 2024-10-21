package com.app.waki.profile.infrastructure.controller;

import com.app.waki.profile.application.dto.AvailablePredictionDto;
import com.app.waki.common.events.CreatePredictionRequestEvent;
import com.app.waki.profile.application.dto.ProfileDto;
import com.app.waki.profile.application.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/{profileId}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable UUID profileId) {

        return ResponseEntity.ok(profileService.getProfile(profileId));
    }

    @GetMapping("/predictionByDate/{profileId}")
    public ResponseEntity<AvailablePredictionDto> getAvailablePredictionsByDate(@PathVariable UUID profileId, @RequestParam LocalDate date) {

        return ResponseEntity.ok(profileService.getAvailablePredictionsByDate(profileId, date));
    }

    @PostMapping("/validatePrediction/{profileId}")
    public ResponseEntity<List<AvailablePredictionDto>> validateAndCreateEventPredictions(@PathVariable UUID profileId,
                                                                                    @RequestBody List<CreatePredictionRequestEvent> predictions){
        return ResponseEntity.ok(profileService.validateAndCreateEventPredictions(profileId,predictions));
    }
}
