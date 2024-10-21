package com.app.waki.prediction.application.utils;

import com.app.waki.prediction.application.dto.PredictionDetailsDto;
import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.PredictionRequest;
import com.app.waki.common.events.CreatePredictionEvent;

import java.util.List;

public class PredictionMapper {

    public static List<PredictionRequest> predictionEventToRequest(CreatePredictionEvent event){

        return event
                .predictions()
                .stream()
                .map(pd -> new PredictionRequest(
                        pd.matchId(),
                        pd.expectedResult(),
                        pd.homeTeam(),
                        pd.awayTeam(),
                        pd.matchDay(),
                        pd.pay(),
                        pd.competition()))
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
