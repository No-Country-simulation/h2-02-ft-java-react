package com.app.waki.profile.domain;

import com.app.waki.profile.domain.valueObject.AvailablePredictionId;
import com.app.waki.profile.domain.valueObject.RemainingPredictions;
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
    @Version
    private Long version;

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

    public boolean validateRemainingPredictions(LocalDate matchDay){

        LocalDate today = LocalDate.now();
        if (matchDay.equals(today)) {
            if (this.remainingPredictions.getValue() > 0) {
                this.remainingPredictions = this.remainingPredictions.subtractOne();
                return true;
            }
        } else if (matchDay.isAfter(today) && matchDay.isBefore(LocalDate.now().plusDays(6))) {
            if (this.remainingPredictions.getValue() > 3) {
                this.remainingPredictions = this.remainingPredictions.subtractOne();
                return true;
            }
        }
        return false;
    }
}
