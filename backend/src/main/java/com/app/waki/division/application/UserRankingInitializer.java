package com.app.waki.division.application;

import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.division.domain.Division;
import com.app.waki.division.domain.DivisionRepository;
import com.app.waki.division.domain.UserRanking;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.division.domain.valueObject.UserRankingId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Order(2)
@Component
@RequiredArgsConstructor
@Slf4j
public class UserRankingInitializer implements CommandLineRunner {
    private final DivisionRepository divisionRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        try {

            Division limboZone = divisionRepository.findByLevel(DivisionLevel.LIMBO)
                    .orElseThrow(() -> new EntityNotFoundException("LIMBO division not found"));

            if (limboZone.getRankings().isEmpty()) {
                log.info("Initializing test user rankings...");


                for (int i = 1; i <= 99; i++) {
                    String username = String.format("TestUser%03d", i);
                    UUID userId = UUID.randomUUID();

                    limboZone.createUserRanking(userId, username);

                    UserRanking lastCreated = limboZone.getRankings()
                            .stream()
                            .filter(ur -> ur.getUserId().equals(new UserRankingId(userId)))
                            .findFirst()
                            .orElseThrow();

                    lastCreated.updatePoints(i + 10);
                }

                divisionRepository.save(limboZone);
                log.info("Successfully created 99 test users in LIMBO division");
            } else {
                log.info("Users already exist in LIMBO division, skipping initialization...");
            }
        } catch (Exception e) {
            log.error("Failed to initialize test user rankings", e);
            throw new RuntimeException("User ranking initialization failed", e);
        }
    }
}
