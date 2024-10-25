package com.app.waki.profile.domain;


import com.app.waki.profile.domain.valueObject.CorrectPredictions;
import com.app.waki.profile.domain.valueObject.ProfileUserId;
import com.app.waki.profile.domain.valueObject.TotalPoints;
import com.app.waki.profile.domain.valueObject.ValidateMatchId;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.*;


@Entity
@EqualsAndHashCode
@ToString
@Getter
@Slf4j
public class Profile {
    @Id
    private ProfileUserId profileUserId;
    private String username;
    private LocalDate timeProfileCreated;
    @Embedded
    private TotalPoints totalPoints;
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<AvailablePrediction> availablePredictions = new ArrayList<>();
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "predicted_matches", joinColumns = @JoinColumn(name = "available_prediction_id"))
    private final List<String> matchIds = new ArrayList<>();
    @Embedded
    private CorrectPredictions correctPredictions;
    @Version
    private Long version;
    public Profile(){};

    private Profile (ProfileUserId profileUserId, String username){
        this.profileUserId = profileUserId;
        this.username = username;
        this.timeProfileCreated = LocalDate.now();
        this.totalPoints = new TotalPoints(0);
        this.availablePredictions = createInitialAvailablePredictions();
        this.correctPredictions = new CorrectPredictions(0);
    }

    public static Profile createProfile(UUID userId, String username){
        var profileUserId = new ProfileUserId(userId);
        return new Profile(profileUserId, username);
    }

    private List<AvailablePrediction> createInitialAvailablePredictions() {
        LocalDate today = LocalDate.now();
        List<AvailablePrediction> predictions = new ArrayList<>();
        for (int i = 0; i <= 5; i++) {
            predictions.add(AvailablePrediction.create(this, today.plusDays(i), 5));
        }
        return predictions;
    }
    public Optional<AvailablePrediction> getPredictionByDate(LocalDate date) {
        return availablePredictions.stream()
                .filter(prediction -> prediction.getPredictionDate().equals(date))
                .findFirst();
    }
    public boolean addMatchId(String matchId){
        if (this.matchIds.contains(matchId)) {
            return false;
        }
        return this.matchIds.add(matchId);
    }
    public boolean removeMatchId(String matchId){
        return this.matchIds.remove(matchId);
    }

    public  void increaseCorrectPredictions(){
        this.correctPredictions = new CorrectPredictions(this.correctPredictions.correctPredictions() + 1);
    }

    public void updateTotalPoints(Integer points){
        this.totalPoints = new TotalPoints(this.totalPoints.points() + points);
    }
}
