package com.app.waki.notification.application;

import com.app.waki.notification.domain.Notification;

import java.util.List;

public interface NotificationService {

    List<Notification> findUnseenNotificationsByProfileId(String profileId);
}
