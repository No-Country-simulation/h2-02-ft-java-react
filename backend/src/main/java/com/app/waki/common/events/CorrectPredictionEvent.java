package com.app.waki.common.events;

import java.util.List;

public record CorrectPredictionEvent(String profileId, List<String> matchId, Integer earnablePoints) {
}
