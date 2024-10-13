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
    private LocalDate matchDay;
    private Double pay;
    private String competition;

    public Prediction(){}

    private Prediction(PredictionDetails predictionDetails, MatchId matchId,
                       ExpectedResult expectedResult, LocalDate matchDay, Double pay, String competition) {
        this.id = new PredictionId();
        this.predictionDetails = predictionDetails;
        this.matchId = matchId;
        this.expectedResult = expectedResult;
        this.matchDay = matchDay;
        this.pay = pay;
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
