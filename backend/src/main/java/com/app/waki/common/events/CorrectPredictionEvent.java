package com.app.waki.common.events;

public record CorrectPredictionEvent(String profileId, String matchId, Integer earnablePoints) {
}
