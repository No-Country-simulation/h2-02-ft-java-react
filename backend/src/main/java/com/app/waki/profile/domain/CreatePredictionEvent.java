package com.app.waki.profile.domain;

import java.util.List;
import java.util.UUID;

public record CreatePredictionEvent(UUID profileId, List<CreatePredictionRequest> predictions) {

}
