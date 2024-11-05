package com.app.waki.notification.domain;

import com.app.waki.notification.domain.valueObject.NotificationId;
import com.app.waki.notification.domain.valueObject.NotificationType;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@EqualsAndHashCode
@ToString
@Getter
public class Notification {

    @Id
    private NotificationId notificationId;
    private String predictionId;
    private String profileId;
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    private LocalDateTime createAt;
    private String tittle;
    private String result;
    private String message;
    private boolean seen;


    public Notification(){
    }

    private Notification(String predictionId, String profileId, NotificationType type, String tittle, String result, String message){
        this.notificationId = new NotificationId();
        this.predictionId = predictionId;
        this.profileId = profileId;
        this.type = type;
        this.createAt = LocalDateTime.now();
        this.tittle = tittle;
        this.result = result;
        this.message = message;
        this.seen = false;
    }

    public static Notification createNotification(String predictionId, String profileId,
                                                  NotificationType type,
                                                  String tittle, String result, String message){
        return new Notification(
                predictionId,
                profileId,
                type,
                tittle,
                result,
                message
        );
    }

    public void setSeen(boolean seen){
        this.seen = seen;
    }
}
