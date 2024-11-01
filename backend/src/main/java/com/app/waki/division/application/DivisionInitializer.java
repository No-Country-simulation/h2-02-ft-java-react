package com.app.waki.division.application;

import com.app.waki.division.domain.Division;
import com.app.waki.division.domain.DivisionRepository;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Order(1)
@Component
@RequiredArgsConstructor
@Slf4j
public class DivisionInitializer implements CommandLineRunner {

    private final DivisionRepository divisionRepository;
    @Override
    @Transactional
    public void run(String... args) throws Exception {

        try {
            if (isDivisionsTableEmpty()) {
                log.info("Initializing divisions...");

                List<Division> divisions = Arrays.stream(DivisionLevel.values())
                        .map(Division::new)
                        .collect(Collectors.toList());

                divisionRepository.saveAll(divisions);

                log.info("Divisions initialized successfully: {}",
                        divisions.stream()
                                .map(d -> d.getDivision().name())
                                .collect(Collectors.joining(", "))
                );
            } else {
                log.info("Divisions already initialized, skipping...");
            }
        } catch (Exception e) {
            log.error("Failed to initialize divisions", e);
            throw new RuntimeException("Division initialization failed", e);
        }

    }
    private boolean isDivisionsTableEmpty() {

        return divisionRepository.isDivisionsTableEmpty();
    }
}
