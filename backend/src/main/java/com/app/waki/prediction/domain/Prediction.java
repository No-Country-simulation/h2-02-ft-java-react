package com.app.waki.prediction.domain;

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
    private PredictionId id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prediction_d_id")
    private PredictionDetails predictionDetails;
    private MatchId matchId;
    @Enumerated(EnumType.STRING)
    private ExpectedResult expectedResult;
    private MatchResult matchResult;
    private LocalDate matchDay;
    private Double odds;
    private String competition;

    public Prediction(){}

    private Prediction(PredictionDetails predictionDetails, MatchId matchId,
                       ExpectedResult expectedResult, LocalDate matchDay, Double odds, String competition) {
        this.id = new PredictionId();
        this.predictionDetails = predictionDetails;
        this.matchId = matchId;
        this.expectedResult = expectedResult;
        this.matchResult = MatchResult.NOT_FINISHED;
        this.matchDay = matchDay;
        this.odds = odds;
        this.competition = competition;
    }

    public static Prediction createPrediction(PredictionDetails predictionDetails, PredictionRequestDto predictionRequest){
        var matchId = new MatchId(predictionRequest.matchId());
        var expectedResult = ExpectedResult.fromString(predictionRequest.expectedResult());

        return new Prediction(
                predictionDetails,
                matchId,
                expectedResult,
                predictionRequest.matchDay(),
                predictionRequest.pay(),
                predictionRequest.competition()
        );
    }

    void setPredictionDetails(PredictionDetails predictionDetails) {
        this.predictionDetails = predictionDetails;
    }


}
