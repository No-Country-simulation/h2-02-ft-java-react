package com.app.waki.profile.application.utils;

import com.app.waki.profile.application.dto.AvailablePredictionDto;
import com.app.waki.common.events.CreatePredictionRequestEvent;
import com.app.waki.profile.application.dto.ProfileDto;
import com.app.waki.profile.domain.AvailablePrediction;
import com.app.waki.common.events.CreatePredictionEvent;
import com.app.waki.profile.domain.Profile;

import java.util.List;
import java.util.UUID;

public class ProfileMapper {

    public static ProfileDto profileToDto(Profile profile, List<AvailablePrediction> predictions){
        List<AvailablePredictionDto> predictionDto = predictions
                .stream()
                .map(ProfileMapper::availablePredictionsToDto)
                .toList();
        return new ProfileDto(
                profile.getProfileUserId().userId(),
                profile.getUsername(),
                profile.getTimeProfileCreated(),
                profile.getTotalPoints().points(),
                profile.getCorrectPredictions().correctPredictions(),
                predictionDto);
    }
    public static AvailablePredictionDto availablePredictionsToDto (AvailablePrediction prediction){
        return new AvailablePredictionDto(
                prediction.getPredictionDate(),
                prediction.getRemainingPredictions().availablePrediction());
    }

    public static CreatePredictionEvent predictionRequestToEvent(UUID profileId, List<CreatePredictionRequestEvent> request){

        return new CreatePredictionEvent(
                profileId,
                request
        );
    }
}
