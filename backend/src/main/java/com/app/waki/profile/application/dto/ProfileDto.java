package com.app.waki.profile.application.dto;


import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record ProfileDto(UUID profileUserId,
                         LocalDate created,
                         Integer totalPoints,
                         List<AvailablePredictionDto> availablePredictions) {
}
