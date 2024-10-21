package com.app.waki.notification.application.service;

import com.app.waki.common.events.EstablishedPredictionEvent;
import com.app.waki.common.events.FinishPredictionEvent;
import com.app.waki.notification.domain.Notification;
import com.app.waki.notification.domain.NotificationRepository;
import com.app.waki.notification.domain.valueObject.NotificationType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository repository;

    @ApplicationModuleListener
    void onEstablishedPrediction (EstablishedPredictionEvent event){
        log.info("Notificacion prediccion establecida " + event.profileId());

        Notification notification = Notification.createNotification(
                event.predictionId(),
                event.profileId(),
                NotificationType.PREDICTION_ESTABLISHED,
                event.creationTime(),
                "Created successfully",
                "Not yet contested",
                "Possible reward " + event.points()
        );

        repository.saveNotification(notification);

    }

    @ApplicationModuleListener
    void onFinishPrediction (FinishPredictionEvent event){
        log.info("Notificacion prediccion finalizada: " + event.result());



    }
}
