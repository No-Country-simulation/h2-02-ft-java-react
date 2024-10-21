package com.app.waki.notification.application.service;

import com.app.waki.common.events.CreatePredictionEvent;
import com.app.waki.common.events.EstablishedPredictionEvent;
import com.app.waki.prediction.application.utils.PredictionMapper;
import com.app.waki.prediction.domain.PredictionDetails;
import com.app.waki.prediction.domain.valueObject.ProfileId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    @ApplicationModuleListener
    void onCreatePrediction (EstablishedPredictionEvent event){
        log.info("new notification with profile id: " + event.profileId());

    }
}
