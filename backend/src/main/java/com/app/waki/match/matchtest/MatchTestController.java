package com.app.waki.match.matchtest;

import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.match.domain.FinalResult;
import com.app.waki.match.domain.fixture.Fixture;
import com.app.waki.match.domain.fixture.FixtureRepository;
import com.app.waki.match.domain.fixture.Goals;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test/match")
@RequiredArgsConstructor
@Slf4j
public class MatchTestController {

    private final ApplicationEventPublisher publisher;
    private final FixtureRepository repository;

    @Transactional
    @PostMapping("/finalize")
    public ResponseEntity<Void> finalizeMatch(@RequestBody MatchResultDto matchResultDto) {

        Fixture findFixture = repository.findById(Long.valueOf(matchResultDto.matchId()))
                .orElseThrow(() -> new EntityNotFoundException("Fixture not found."));
        log.info("Equipo Local" + findFixture.getTeams().getHome());
        log.info("goles previos" + findFixture.getGoals().getHomeGoals());
        log.info("goles previos" + findFixture.getGoals().getAwayGoals());
        Goals newGoals = new Goals();
        newGoals.setHomeGoals(matchResultDto.homeGoals());
        newGoals.setAwayGoals(matchResultDto.awayGoals());
        findFixture.setNewGoals(newGoals);
        findFixture.setFinalResult(FinalResult.valueOf(matchResultDto.result()));
        repository.save(findFixture);

        log.info("fixture actualizado" + findFixture.getId());
        log.info("goles previos" + findFixture.getGoals().getHomeGoals());

        MatchFinalizedEvent event = new MatchFinalizedEvent(
                matchResultDto.matchId(),
                matchResultDto.result(),
                matchResultDto.homeGoals(),
                matchResultDto.awayGoals());
        publisher.publishEvent(event);

        return ResponseEntity.ok().build();
    }
}
