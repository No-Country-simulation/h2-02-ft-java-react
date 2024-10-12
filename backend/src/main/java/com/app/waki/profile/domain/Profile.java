package com.app.waki.profile.domain;


import com.app.waki.profile.domain.valueObjects.ProfileUserId;
import com.app.waki.profile.domain.valueObjects.TotalPoints;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Entity
@EqualsAndHashCode
@ToString
@Getter
public class Profile {
    @Id
    private ProfileUserId profileUserId;
    private LocalDate timeProfileCreated;
    @Embedded
    private TotalPoints totalPoints;
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AvailablePrediction> availablePredictions = new ArrayList<>();

    public Profile(){};

    private Profile (ProfileUserId profileUserId){
        this.profileUserId = profileUserId;
        this.timeProfileCreated = LocalDate.now();
        this.totalPoints = new TotalPoints(0);
        this.availablePredictions = createInitialAvailablePredictions();
    }

    public static Profile createProfile(UUID userId){
        var profileUserId = new ProfileUserId(userId);
        return new Profile(profileUserId);
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
}
