package com.app.waki.match.matchtest;

import java.time.LocalDateTime;

public record MatchResultDto(String matchId, String result, Integer homeGoals, Integer awayGoals, String longStatus, String shortStatus) {
}
