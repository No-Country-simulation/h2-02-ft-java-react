package com.app.waki.notification.domain;

import java.util.List;

public interface NotificationRepository {

    void saveNotification(Notification notification);

    List<Notification> findUnseenNotificationsByProfileId(String profileId);
}
