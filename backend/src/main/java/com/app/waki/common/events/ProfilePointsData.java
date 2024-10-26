package com.app.waki.common.events;

import java.util.UUID;

public record ProfilePointsData(UUID profileId, int points) {
}
