package com.app.waki.common.events;

import java.time.LocalDateTime;
import java.util.List;

public record ProfilePointsBatchEvent(List<ProfilePointsData> profiles, LocalDateTime time) {
}
