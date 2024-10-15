package com.app.waki.match.application;

import com.app.waki.match.domain.*;
import com.app.waki.match.domain.Match;
import com.app.waki.match.domain.MatchResponse;
import com.app.waki.match.domain.Odds;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.http.*;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class MatchServiceImpl implements MatchService {

    private final MatchRepository repo;
    private final ObjectMapper objectMapper;
    private final Random random = new Random();

    public MatchServiceImpl(MatchRepository repo, ObjectMapper objectMapper) {
        this.repo = repo;
        this.objectMapper = objectMapper;
    }

    @Override
    public void UpdateMatches() {
            try {
                List<Long> existingIds = repo.findAllIds();
                Map<Long, Match> existingMatchesMap = repo.findAllById(existingIds).stream()
                        .collect(Collectors.toMap(Match::getId, match -> match));

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("https://api.football-data.org/v4/matches/?ids=497488,497481,524042,524047,525164,525165,500585,500589"))
                        .header("X-Auth-Token", "c83c236d84604a11b92b78aa10631d05")
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();

                HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
                MatchResponse matchResponse = objectMapper.readValue(response.body(), MatchResponse.class);

                for (Match match : matchResponse.getMatches()) {
                    if (match.getMatch_odds() == null) {
                        Odds odds = new Odds();
                        odds.setHome_team(new BigDecimal(1.0 + (3.0 - 1.0) * random.nextDouble()).setScale(2, RoundingMode.HALF_UP).doubleValue());
                        odds.setAway_team(new BigDecimal(1.0 + (3.0 - 1.0) * random.nextDouble()).setScale(2, RoundingMode.HALF_UP).doubleValue());
                        odds.setDraw(new BigDecimal(1.0 + (3.0 - 1.0) * random.nextDouble()).setScale(2, RoundingMode.HALF_UP).doubleValue());
                        match.setMatch_odds(odds);
                    }

                    Match existingMatch = existingMatchesMap.get(match.getId());
                    if (existingMatch != null) {
                        existingMatch.updateFrom(match);
                        repo.save(existingMatch);
                    } else {
                        // Verificar que los odds no sean nulos aquí
                        System.out.println("Saving new match with odds: " + match.getMatch_odds());
                        repo.save(match);
                    }
                }
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            } catch (Exception e) {
                System.out.println("Error saving match: " + e.getMessage());
            };
    }

    @Override
    public List<Match> findAllMatches() {
        return repo.findAll();
    }
}