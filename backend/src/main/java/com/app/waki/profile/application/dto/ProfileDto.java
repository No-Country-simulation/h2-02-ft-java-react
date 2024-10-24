package com.app.waki.profile.application.dto;


import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record ProfileDto(UUID profileUserId,
                         String username,
                         LocalDate created,
                         Integer totalPoints,
                         Integer correctPredictions,
                         List<AvailablePredictionDto> availablePredictions) {
}
