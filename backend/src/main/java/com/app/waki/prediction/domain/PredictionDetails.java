package com.app.waki.prediction.domain;


import com.app.waki.common.exceptions.ValidationException;
import com.app.waki.prediction.domain.valueObject.EarnablePoints;
import com.app.waki.prediction.domain.valueObject.PredictionDetailsId;
import com.app.waki.prediction.domain.valueObject.PredictionStatus;
import com.app.waki.prediction.domain.valueObject.ProfileId;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.*;

@Entity
@EqualsAndHashCode
@ToString
@Getter
public class PredictionDetails {

    @Id
    private PredictionDetailsId predictionDetailsId;
    private ProfileId profileId;
    @OneToMany(mappedBy = "predictionDetails", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Prediction> predictions = new ArrayList<>();
    private LocalDate creationTime;
    private Boolean combined;
    @Embedded
    private EarnablePoints earnablePoints;
    @Enumerated(EnumType.STRING)
    private PredictionStatus status;
    @Version
    private Long version;

    public PredictionDetails(){}

    private PredictionDetails(ProfileId profileId, List<PredictionRequest> predictionRequest){
        this.predictionDetailsId = new PredictionDetailsId();
        this.profileId = profileId;
        this.predictions = createPredictions(predictionRequest);
        this.creationTime = LocalDate.now();
        this.combined = isCombined();
        this.earnablePoints = calculateTotalPoints();
        this.status = PredictionStatus.PENDING;

    }

    public static PredictionDetails createPredictionDetails(ProfileId profileId, List<PredictionRequest> predictionRequest) {
        validateUniqueMatchIds(predictionRequest);
        return new PredictionDetails(profileId,predictionRequest);
    }

    private List<Prediction> createPredictions(List<PredictionRequest> predictionRequest) {

        return predictionRequest.stream()
                .map(dto -> Prediction.createPrediction(this, dto))
                .toList();
    }

    private static void validateUniqueMatchIds(List<PredictionRequest> predictionRequest) {
        Set<String> uniqueMatchIds = new HashSet<>();
        for (PredictionRequest dto : predictionRequest) {
            if (!uniqueMatchIds.add(dto.matchId())) {
                throw new ValidationException("Duplicate match ID found: " + dto.matchId());
            }
        }
    }

    private boolean isCombined () {
        return this.predictions.size() > 1;
    }

    private EarnablePoints calculateTotalPoints(){
        if(!this.combined){
            var totalPoints = (int)(this.predictions.get(0).getOdds() * 10);
            return new EarnablePoints(totalPoints);
        } else {
            double combinedPay = this.predictions.stream()
                    .mapToDouble(Prediction::getOdds)
                    .reduce(1, (a, b) -> a * b);
            int numberOfPredictions = this.predictions.size();
            var totalPoints = (int)(combinedPay * 10 * numberOfPredictions);
            return new EarnablePoints(totalPoints);
        }
    }
}
