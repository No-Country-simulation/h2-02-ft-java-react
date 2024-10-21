package com.app.waki.match.matchtest;

public record MatchFinalizedEvent(String matchId, String result, Integer homeGoals, Integer awayGoals) {
}
