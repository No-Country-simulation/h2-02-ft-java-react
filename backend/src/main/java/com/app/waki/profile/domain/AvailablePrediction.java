package com.app.waki.profile.domain;

import com.app.waki.profile.domain.valueObjects.AvailablePredictionId;
import com.app.waki.profile.domain.valueObjects.RemainingPredictions;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@EqualsAndHashCode
@ToString
@Getter
public class AvailablePrediction {

    @Id
    private AvailablePredictionId availablePredictionId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_user_id")
    private Profile profile;
    private LocalDate predictionDate;
    private RemainingPredictions remainingPredictions;

    public AvailablePrediction(){}

    private AvailablePrediction(Profile profile, LocalDate predictionDate, RemainingPredictions remainingPredictions){
        this.availablePredictionId = new AvailablePredictionId();
        this.profile = profile;
        this.predictionDate = predictionDate;
        this.remainingPredictions = remainingPredictions;
    }
    public static AvailablePrediction create(Profile profile, LocalDate predictionDate, Integer remainingPredictions) {
        var predictions = new RemainingPredictions(remainingPredictions);
        return new AvailablePrediction(profile, predictionDate, predictions);
    }
}
