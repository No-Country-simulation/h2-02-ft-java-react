package com.app.waki.match.application;

import com.app.waki.match.application.dto.FullTimeDTO;
import com.app.waki.match.application.dto.HalfTimeDTO;
import com.app.waki.match.application.dto.MatchSummaryDTO;
import com.app.waki.match.application.dto.OddsDTO;
import com.app.waki.match.application.dto.ScoreDTO;
import com.app.waki.match.application.dto.TeamAwayDTO;
import com.app.waki.match.application.dto.TeamHomeDTO;
import com.app.waki.match.domain.Match;
import com.app.waki.match.domain.Odds;
import com.app.waki.match.domain.Score;
import com.app.waki.match.domain.TeamAway;
import com.app.waki.match.domain.TeamHome;
import com.app.waki.match.domain.TimeScore;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-23T19:37:54-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.5 (Oracle Corporation)"
)
@Component
public class MatchMapperImpl implements MatchMapper {

    private final DateTimeFormatter dateTimeFormatter_yyyy_MM_dd_T_HH_mm_ss_11798231098 = DateTimeFormatter.ofPattern( "yyyy-MM-dd'T'HH:mm:ss" );

    @Override
    public MatchSummaryDTO matchToMatchSummaryDTO(Match match) {
        if ( match == null ) {
            return null;
        }

        OddsDTO odds = null;
        TeamHomeDTO homeTeam = null;
        TeamAwayDTO awayTeam = null;
        ScoreDTO score = null;
        String utcDate = null;
        Long id = null;
        String status = null;

        odds = oddsToOddsDTO( match.getMatch_odds() );
        homeTeam = teamHomeToTeamHomeDTO( match.getHomeTeam() );
        awayTeam = teamAwayToTeamAwayDTO( match.getAwayTeam() );
        score = scoreToScoreDTO( match.getScore() );
        if ( match.getUtcDate() != null ) {
            utcDate = dateTimeFormatter_yyyy_MM_dd_T_HH_mm_ss_11798231098.format( match.getUtcDate() );
        }
        id = match.getId();
        status = match.getStatus();

        MatchSummaryDTO matchSummaryDTO = new MatchSummaryDTO( id, utcDate, status, homeTeam, awayTeam, score, odds );

        return matchSummaryDTO;
    }

    protected OddsDTO oddsToOddsDTO(Odds odds) {
        if ( odds == null ) {
            return null;
        }

        Double home_team = null;
        Double away_team = null;
        Double draw = null;

        home_team = odds.getHome_team();
        away_team = odds.getAway_team();
        draw = odds.getDraw();

        OddsDTO oddsDTO = new OddsDTO( home_team, away_team, draw );

        return oddsDTO;
    }

    protected TeamHomeDTO teamHomeToTeamHomeDTO(TeamHome teamHome) {
        if ( teamHome == null ) {
            return null;
        }

        String name = null;
        String crest = null;

        name = teamHome.getName();
        crest = teamHome.getCrest();

        TeamHomeDTO teamHomeDTO = new TeamHomeDTO( name, crest );

        return teamHomeDTO;
    }

    protected TeamAwayDTO teamAwayToTeamAwayDTO(TeamAway teamAway) {
        if ( teamAway == null ) {
            return null;
        }

        String name = null;
        String crest = null;

        name = teamAway.getName();
        crest = teamAway.getCrest();

        TeamAwayDTO teamAwayDTO = new TeamAwayDTO( name, crest );

        return teamAwayDTO;
    }

    protected FullTimeDTO timeScoreToFullTimeDTO(TimeScore timeScore) {
        if ( timeScore == null ) {
            return null;
        }

        Integer home = null;
        Integer away = null;

        home = timeScore.getHome();
        away = timeScore.getAway();

        FullTimeDTO fullTimeDTO = new FullTimeDTO( home, away );

        return fullTimeDTO;
    }

    protected HalfTimeDTO timeScoreToHalfTimeDTO(TimeScore timeScore) {
        if ( timeScore == null ) {
            return null;
        }

        Integer home = null;
        Integer away = null;

        home = timeScore.getHome();
        away = timeScore.getAway();

        HalfTimeDTO halfTimeDTO = new HalfTimeDTO( home, away );

        return halfTimeDTO;
    }

    protected ScoreDTO scoreToScoreDTO(Score score) {
        if ( score == null ) {
            return null;
        }

        String winner = null;
        String duration = null;
        FullTimeDTO fullTime = null;
        HalfTimeDTO halfTime = null;

        winner = score.getWinner();
        duration = score.getDuration();
        fullTime = timeScoreToFullTimeDTO( score.getFullTime() );
        halfTime = timeScoreToHalfTimeDTO( score.getHalfTime() );

        ScoreDTO scoreDTO = new ScoreDTO( winner, duration, fullTime, halfTime );

        return scoreDTO;
    }
}
