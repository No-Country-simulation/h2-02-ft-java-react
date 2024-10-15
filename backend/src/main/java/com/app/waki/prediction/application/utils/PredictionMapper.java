package com.app.waki.prediction.application.utils;

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
}
