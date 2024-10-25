package com.app.waki.profile.application.service;

import com.app.waki.common.events.ProfilePointsBatchEvent;
import com.app.waki.common.events.ProfilePointsData;
import com.app.waki.profile.domain.Profile;
import com.app.waki.profile.domain.ProfileRepository;
import com.app.waki.profile.domain.valueObject.ProfileUserId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileBatchService {

    private final ProfileRepository profileRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Value("${batch.size:10}")
    private int batchSize;

    @Transactional
    public void processProfilesBatch() {

        int processedTotal = 0;
        List<Profile> unprocessedProfiles;

        // Procesar en lotes del tamaño configurado
        do {
            unprocessedProfiles = profileRepository.findUnprocessedProfilesWithPoints()
                    .stream()
                    .limit(batchSize)
                    .collect(Collectors.toList());

            if (!unprocessedProfiles.isEmpty()) {
                // Preparar los datos para el evento
                List<ProfilePointsData> updates = unprocessedProfiles.stream()
                        .map(profile -> new ProfilePointsData(
                                profile.getProfileUserId().id().toString(),
                                profile.getTotalPoints().points()
                        ))
                        .collect(Collectors.toList());

                // Publicar el evento con los datos del lote
                eventPublisher.publishEvent(new ProfilePointsBatchEvent(
                        updates,
                        LocalDateTime.now()
                ));

                // Marcar los perfiles como procesados
                List<ProfileUserId> processedIds = unprocessedProfiles.stream()
                        .map(Profile::getProfileUserId)
                        .collect(Collectors.toList());

                profileRepository.markProfilesAsProcessed(processedIds);

                processedTotal += unprocessedProfiles.size();
                log.info("Processed batch of {} profiles. Total processed: {}",
                        unprocessedProfiles.size(), processedTotal);
            }
        } while (!unprocessedProfiles.isEmpty());

        log.info("Batch processing completed. Total profiles processed: {}", processedTotal);
    }
}
