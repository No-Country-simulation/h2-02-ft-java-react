package com.app.waki.common.events;

public record FinishedMatchEvent(Long matchId, String result, int homeGoals, int awayGoals) {
}