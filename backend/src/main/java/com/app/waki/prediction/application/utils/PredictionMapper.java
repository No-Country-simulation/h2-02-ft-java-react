package com.app.waki.prediction.application.utils;

import com.app.waki.common.events.EstablishedPredictionEvent;
import com.app.waki.common.events.FinishCorrectPredictionEvent;
import com.app.waki.common.events.FinishFailedPredictionEvent;
import com.app.waki.prediction.application.dto.PredictionDetailsDto;
import com.app.waki.prediction.domain.Prediction;
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

    public static FinishCorrectPredictionEvent correctPredictionEvent(PredictionDetails pd){

        Prediction prediction = pd.getPredictions().get(0);

        String result = prediction.getHomeTeam().team() + " "
                        + prediction.getHomeGoals().homeGoals().toString() + "-"
                        + prediction.getAwayGoals().awayGoals().toString() + " "
                        + prediction.getAwayTeam().team();

        return new FinishCorrectPredictionEvent(
                pd.getPredictionDetailsId().detailsId().toString(),
                pd.getProfileId().profileId().toString(),
                pd.getCreationTime(),
                result,
                pd.getEarnablePoints().points()
        );
    }

    public static FinishFailedPredictionEvent failedPredictionEvent(PredictionDetails pd){

        Prediction prediction = pd.getPredictions().get(0);

        String result = prediction.getHomeTeam().team() + " "
                + prediction.getHomeGoals().homeGoals().toString() + "-"
                + prediction.getAwayGoals().awayGoals().toString() + " "
                + prediction.getAwayTeam().team();

        return new FinishFailedPredictionEvent(
                pd.getPredictionDetailsId().detailsId().toString(),
                pd.getProfileId().profileId().toString(),
                pd.getCreationTime(),
                result,
                pd.getEarnablePoints().points()
        );
    }

    public static EstablishedPredictionEvent establishedPredictionEvent(PredictionDetails pd){

        return new EstablishedPredictionEvent(
                pd.getPredictionDetailsId().detailsId().toString(),
                pd.getProfileId().profileId().toString(),
                pd.getCreationTime(),
                pd.getEarnablePoints().points()
        );
    }
}
