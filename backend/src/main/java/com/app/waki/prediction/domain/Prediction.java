package com.app.waki.prediction.domain;

import com.app.waki.prediction.domain.valueObject.*;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@EqualsAndHashCode
@ToString
@Getter
public class Prediction {

    @Id
    private PredictionId predictionId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "details_id")
    private PredictionDetails predictionDetails;
    private String matchId;
    @Enumerated(EnumType.STRING)
    private ExpectedResult expectedResult;
    @Enumerated(EnumType.STRING)
    private MatchResult matchResult;
    @AttributeOverrides({
            @AttributeOverride(name = "team", column = @Column(name = "home_team"))
    })
    private Team homeTeam;
    @AttributeOverrides({
            @AttributeOverride(name = "team", column = @Column(name = "away_team"))
    })
    private Team awayTeam;
    private HomeGoals homeGoals;
    private AwayGoals awayGoals;
    private LocalDate matchDay;
    private Double odds;
    private String competition;
    private Boolean combined;
    @Enumerated(EnumType.STRING)
    private PredictionStatus status;
    @Version
    private Long version;

    public Prediction(){}

    private Prediction(PredictionDetails predictionDetails, String matchId, ExpectedResult expectedResult,
                       Team homeTeam, Team awayTeam, LocalDate matchDay,
                       Double odds, String competition, Boolean combined) {
        this.predictionId = new PredictionId();
        this.predictionDetails = predictionDetails;
        this.matchId = matchId;
        this.expectedResult = expectedResult;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.matchResult = MatchResult.PENDING;
        this.matchDay = matchDay;
        this.odds = odds;
        this.competition = competition;
        this.combined = combined;
        this.status = PredictionStatus.PENDING;
    }

    public static Prediction createPrediction(PredictionDetails predictionDetails, PredictionRequest predictionRequest, Boolean combined){

        var expectedResult = ExpectedResult.fromString(predictionRequest.expectedResult());
        var homeTeam = new Team(predictionRequest.homeTeam());
        var awayTeam = new Team(predictionRequest.awayTeam());

        return new Prediction(
                predictionDetails,
                predictionRequest.matchId(),
                expectedResult,
                homeTeam,
                awayTeam,
                predictionRequest.matchDay(),
                predictionRequest.pay(),
                predictionRequest.competition(),
                combined
        );
    }

    void setPredictionDetails(PredictionDetails predictionDetails) {
        this.predictionDetails = predictionDetails;
    }

    public void updateMatchResult(MatchResult result, Integer homeGoals, Integer awayGoals) {
        this.matchResult = result;
        this.status = (this.expectedResult.toString().equals(result.toString())) ? PredictionStatus.CORRECT : PredictionStatus.FAILED;
        this.homeGoals = new HomeGoals(homeGoals);
        this.awayGoals = new AwayGoals(awayGoals);
    }

    public boolean isPredictionCorrect(){

        return this.status.equals(PredictionStatus.CORRECT);
    }

    public boolean getCombined(){
        return this.combined;
    }

    public void setPredictionStatus(PredictionStatus status){
        this.status = status;
    }

    public void setMatchResult(MatchResult matchResult){
        this.matchResult = matchResult;
    }
}
