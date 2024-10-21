package com.app.waki.match.application.dto;

public record MatchSummaryDTO(
        Long id,
        String utcDate,
        String status,
        TeamHomeDTO homeTeam,
        TeamAwayDTO awayTeam,
        ScoreDTO score,
        OddsDTO odds
) {}
