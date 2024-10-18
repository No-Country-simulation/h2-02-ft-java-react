package com.app.waki.match.application.dto;

public record ScoreDTO(
        String winner,
        String duration,
        FullTimeDTO fullTime,
        HalfTimeDTO halfTime
) {}
