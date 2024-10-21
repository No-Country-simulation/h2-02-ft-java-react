package com.app.waki.match.application;

import com.app.waki.match.application.dto.MatchSummaryDTO;
import com.app.waki.match.domain.Match;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MatchMapper {

    @Mapping(source = "match.utcDate", target = "utcDate", dateFormat = "yyyy-MM-dd'T'HH:mm:ss")
    @Mapping(source = "match.match_odds.home_team", target = "odds.home_team")
    @Mapping(source = "match.match_odds.away_team", target = "odds.away_team")
    @Mapping(source = "match.match_odds.draw", target = "odds.draw")
    @Mapping(source = "match.homeTeam.name", target = "homeTeam.name")
    @Mapping(source = "match.homeTeam.crest", target = "homeTeam.crest")
    @Mapping(source = "match.awayTeam.name", target = "awayTeam.name")
    @Mapping(source = "match.awayTeam.crest", target = "awayTeam.crest")
    @Mapping(source = "match.score.winner", target = "score.winner")
    @Mapping(source = "match.score.duration", target = "score.duration")
    @Mapping(source = "match.score.fullTime", target = "score.fullTime")
    @Mapping(source = "match.score.halfTime", target = "score.halfTime")
    MatchSummaryDTO matchToMatchSummaryDTO(Match match);
}
