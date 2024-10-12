package com.app.waki.profile.application.utils;

import com.app.waki.profile.application.dto.AvailablePredictionDto;
import com.app.waki.profile.application.dto.ProfileDto;
import com.app.waki.profile.domain.AvailablePrediction;
import com.app.waki.profile.domain.Profile;

import java.util.List;

public class ProfileMapper {

    public static ProfileDto profileToDto(Profile profile){

        List<AvailablePredictionDto> predictions = predictionToDtop(profile.getAvailablePredictions());
        return new ProfileDto(
                profile.getProfileUserId().userId(),
                profile.getTimeProfileCreated(),
                profile.getTotalPoints().points(),
                predictions);
    }

    public static List<AvailablePredictionDto> predictionToDtop(List<AvailablePrediction> remainingPredictions){

        return remainingPredictions
                .stream()
                .map(prediction -> new AvailablePredictionDto(
                        prediction.getPredictionDate(),
                        prediction.getRemainingPredictions().AvailablePrediction()))
                .toList();

    }
}
