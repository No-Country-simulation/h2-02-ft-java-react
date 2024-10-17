package com.app.waki.match.application;

import com.app.waki.match.domain.Match;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface MatchService {
    void UpdateMatches() throws IOException, InterruptedException;
    List<Match> findAllMatches();
    Optional<Match> findById(Long id);
    List<Match> getMatchesWithinFiveDays(String code);
    List<MatchAreaCompetitionDTO> getMatchesWithAreaAndCompetition();
}
