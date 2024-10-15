package com.app.waki.match.application;

import com.app.waki.match.domain.Match;

import java.io.IOException;
import java.util.List;

public interface MatchService {
    void UpdateMatches() throws IOException, InterruptedException;
    List<Match> findAllMatches();
}
