package com.app.waki.division.application;

import com.app.waki.common.events.ProfilePointsBatchEvent;
import com.app.waki.common.events.ProfilePointsData;
import com.app.waki.division.domain.DivisionRepository;
import com.app.waki.division.domain.UserRanking;
import com.app.waki.division.domain.valueObject.UserRankingId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfilePointsBatchListener {

    private final DivisionRepository divisionRepository;

    @ApplicationModuleListener
    public void handleProfilePointsBatch(ProfilePointsBatchEvent event) {
        try {
            log.info("Processing points batch update for {} profiles", event.profiles().size());

            // Convertir profileIds a UserRankingIds
            List<UserRankingId> userRankingIds = event.profiles().stream()
                    .map(profile -> new UserRankingId(profile.profileId()))
                    .collect(Collectors.toList());

            // Obtener UserRankings existentes
            List<UserRanking> rankings = divisionRepository.findUserRankingsByUserIds(userRankingIds);

            // Crear mapa de puntos del evento para búsqueda rápida
            Map<UUID, Integer> pointsMap = event.profiles().stream()
                    .collect(Collectors.toMap(ProfilePointsData::profileId, ProfilePointsData::points));

            // Actualizar points de cada UserRanking
            rankings.forEach(ranking -> {
                UUID profileId = ranking.getUserId().userId();
                Integer newPoints = pointsMap.get(profileId);
                if (newPoints != null) {
                    ranking.updatePoints(newPoints);
                }
            });

            log.info("Points batch update completed successfully");

        } catch (Exception e) {
            log.error("Error processing points batch update", e);
            throw new RuntimeException("Failed to process points batch update", e);
        }
    }
}
