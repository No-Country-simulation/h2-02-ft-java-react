package com.app.waki.prediction.application.utils;

import com.app.waki.prediction.application.dto.PredictionDetailsDto;
import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.PredictionRequest;
import com.app.waki.profile.domain.CreatePredictionEvent;

import java.util.List;

public class PredictionMapper {

    public static List<PredictionRequest> predictionEventToRequest(CreatePredictionEvent event){

        return event
                .predictions()
                .stream()
                .map(pe -> new PredictionRequest(
                        pe.matchId(),
                        pe.expectedResult(),
                        pe.matchDay(),
                        pe.pay(),
                        pe.competition()))
                .toList();
    }

    public static PredictionDetailsDto predictionDetailsToDto(PredictionDetails predictions){

        return new PredictionDetailsDto(
                predictions.getPredictionDetailsId().detailsId().toString(),
                predictions.getProfileId().profileId().toString(),
                predictions.getCreationTime(),
                predictions.getCombined(),
                predictions.getEarnablePoints().points(),
                predictions.getStatus().name()
        );
    }
}
