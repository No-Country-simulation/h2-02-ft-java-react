package com.app.waki.match.matchtest;

import lombok.RequiredArgsConstructor;
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
public class MatchTestController {

    private final ApplicationEventPublisher publisher;
    @Transactional
    @PostMapping("/finalize")
    public ResponseEntity<Void> finalizeMatch(@RequestBody MatchResultDto matchResultDto) {

        MatchFinalizedEvent event = new MatchFinalizedEvent(
                matchResultDto.matchId(),
                matchResultDto.result(),
                matchResultDto.homeGoals(),
                matchResultDto.awayGoals());
        publisher.publishEvent(event);

        return ResponseEntity.ok().build();
    }
}
