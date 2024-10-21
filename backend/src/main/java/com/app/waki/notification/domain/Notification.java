package com.app.waki.notification.domain;

import com.app.waki.notification.domain.valueObject.NotificationId;
import com.app.waki.notification.domain.valueObject.NotificationType;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDateTime;


@EqualsAndHashCode
@ToString
public class Notification {


    private NotificationId notificationId;
    private String predictionId;
    private String profileId;
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    private LocalDateTime createAt;
    private String tittle;
    private String result;
    private String message;


    public Notification(){
    }

    private Notification(String predictionId, String profileId, NotificationType type,
                        LocalDateTime createAt, String tittle, String result, String message){
        this.notificationId = new NotificationId();
        this.predictionId = predictionId;
        this.profileId = profileId;
        this.type = type;
        this.createAt = createAt;
        this.tittle = tittle;
        this.result = result;
        this.message = message;
    }

    public static Notification createNotification(String predictionId, String profileId, NotificationType type,
                                                  LocalDateTime createAt, String tittle, String result, String message){
        return new Notification(
                predictionId,
                profileId,
                type,
                createAt,
                tittle,
                result,
                message
        );
    }
}
