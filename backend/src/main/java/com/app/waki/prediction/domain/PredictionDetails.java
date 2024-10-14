//package com.app.waki.prediction.domain;
//
//
//import com.app.waki.common.exceptions.ValidationException;
//import jakarta.persistence.*;
//import lombok.EqualsAndHashCode;
//import lombok.Getter;
//import lombok.ToString;
//
//import java.time.LocalDate;
//import java.util.*;
//
//@Entity
//@EqualsAndHashCode
//@ToString
//@Getter
//public class PredictionDetails {
//
//    @Id
//    private PredictionDetailsId predictionId;
//    private UserId userId;
//    @OneToMany(mappedBy = "predictionDetails", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
//    private List<Prediction> predictions = new ArrayList<>();
//    private LocalDate creationTime;
//    private Boolean combined;
//    private EarnablePoints earnablePoints;
//    @Enumerated(EnumType.STRING)
//    private PredictionStatus status;
//
//    public PredictionDetails(){}
//
//    private PredictionDetails(PredictionDetailsId id, UserId userId, List<Prediction> predictions){
//        this.predictionId = id;
//        this.userId = userId;
//        this.predictions = new ArrayList<>(predictions);
//        this.creationTime = LocalDate.now();
//        this.combined = isCombined();
//        this.earnablePoints = calculateTotalPoints();
//        this.status = PredictionStatus.PENDING;
//
//    }
//
//    public static PredictionDetails createPredictionDetails(UserId userId, List<PredictionRequestDto> predictionRequestDto) {
//        validateUniqueMatchIds(predictionRequestDto);
//        PredictionDetails predictionDetails = new PredictionDetails(new PredictionDetailsId(), userId, new ArrayList<>());
//        List<Prediction> predictions = createPredictions(predictionDetails, predictionRequestDto);
//        predictionDetails.predictions.addAll(predictions);
//        return predictionDetails;
//    }
//
//    private static List<Prediction> createPredictions(PredictionDetails predictionDetails, List<PredictionRequestDto> predictionRequestDto) {
//
//        return predictionRequestDto.stream()
//                .map(dto -> Prediction.createPrediction(predictionDetails, dto))
//                .toList();
//    }
//
//    private static void validateUniqueMatchIds(List<PredictionRequestDto> predictionRequestDto) {
//        Set<String> uniqueMatchIds = new HashSet<>();
//        for (PredictionRequestDto dto : predictionRequestDto) {
//            if (!uniqueMatchIds.add(dto.matchId())) {
//                throw new ValidationException("Duplicate match ID found: " + dto.matchId());
//            }
//        }
//    }
//
//    private boolean isCombined () {
//        return this.predictions.size() > 1;
//    }
//
//    private EarnablePoints calculateTotalPoints(){
//        if(!this.combined){
//            var totalPoints = (int)(this.predictions.get(0).getOdds() * 10);
//            return new EarnablePoints(totalPoints);
//        } else {
//            double combinedPay = this.predictions.stream()
//                    .mapToDouble(Prediction::getOdds)
//                    .reduce(1, (a, b) -> a * b);
//            int numberOfPredictions = this.predictions.size();
//            var totalPoints = (int)(combinedPay * numberOfPredictions);
//            return new EarnablePoints(totalPoints);
//        }
//    }
//}
