package com.app.waki.notification.infrastructure.jpa;

import com.app.waki.notification.domain.Notification;
import com.app.waki.notification.domain.valueObject.NotificationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaNotificationDataRepository extends JpaRepository<Notification, NotificationId> {


    @Query("SELECT n FROM Notification n WHERE n.profileId = :profileId AND n.seen = false ORDER BY n.createAt DESC")
    List<Notification> findUnseenNotificationsByProfileId(@Param("profileId") String profileId);

}
