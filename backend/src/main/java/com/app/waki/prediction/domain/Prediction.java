package com.app.waki.prediction.domain;

import com.app.waki.prediction.domain.valueObject.ExpectedResult;
import com.app.waki.prediction.domain.valueObject.MatchId;
import com.app.waki.prediction.domain.valueObject.MatchResult;
import com.app.waki.prediction.domain.valueObject.PredictionId;
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
    private MatchId matchId;
    @Enumerated(EnumType.STRING)
    private ExpectedResult expectedResult;
    @Enumerated(EnumType.STRING)
    private MatchResult matchResult;
    private LocalDate matchDay;
    private Double odds;
    private String competition;
    @Version
    private Long version;

    public Prediction(){}

    private Prediction(PredictionDetails predictionDetails, MatchId matchId,
                       ExpectedResult expectedResult, LocalDate matchDay, Double odds, String competition) {
        this.predictionId = new PredictionId();
        this.predictionDetails = predictionDetails;
        this.matchId = matchId;
        this.expectedResult = expectedResult;
        this.matchResult = MatchResult.PENDING;
        this.matchDay = matchDay;
        this.odds = odds;
        this.competition = competition;
    }

    public static Prediction createPrediction(PredictionDetails predictionDetails, PredictionRequest predictionRequest){
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
