package com.app.waki.common.events;

import java.util.List;
import java.util.UUID;

public record CreatePredictionEvent(UUID profileId, List<CreatePredictionRequestEvent> predictions) {

}
