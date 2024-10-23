package com.app.waki.notification.application;

import com.app.waki.common.events.EstablishedPredictionEvent;
import com.app.waki.common.events.FinishCorrectPredictionEvent;
import com.app.waki.common.events.FinishFailedPredictionEvent;
import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.notification.domain.Notification;
import com.app.waki.notification.domain.NotificationRepository;
import com.app.waki.notification.domain.valueObject.NotificationType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService{

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
    void onCorrectPrediction (FinishCorrectPredictionEvent event){
        log.info("Notificacion prediccion finalizada: " + event.result());

        Notification notification = Notification.createNotification(
                event.predictionId(),
                event.profileId(),
                NotificationType.PREDICTION_CORRECT,
                event.creationTime(),
                "Correct",
                event.result(),
                "You won " + event.points() + " points"
        );

        repository.saveNotification(notification);
    }

    @ApplicationModuleListener
    void onFailedPrediction (FinishFailedPredictionEvent event){
        log.info("Notificacion prediccion finalizada: " + event.result());

        Notification notification = Notification.createNotification(
                event.predictionId(),
                event.profileId(),
                NotificationType.PREDICTION_FAILED,
                event.creationTime(),
                "Fail",
                event.result(),
                "You have not earned any points"
        );

        repository.saveNotification(notification);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Notification> findUnseenNotificationsByProfileId(String profileId) {

        List<Notification> notifications = repository.findUnseenNotificationsByProfileId(profileId);

        if (notifications.isEmpty()){
            throw new EntityNotFoundException("The user has no pending notifications");
        }

        return notifications;
    }
}
