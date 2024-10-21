package com.app.waki.notification.infrastructure.jpa;

import com.app.waki.notification.domain.Notification;
import com.app.waki.notification.domain.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class JpaNotificationRepositoryImpl implements NotificationRepository {

    private final JpaNotificationDataRepository repository;

    @Override
    public void saveNotification(Notification notification) {
        repository.save(notification);
    }

    @Override
    public List<Notification> findUnseenNotificationsByProfileId(String profileId) {
        return repository.findUnseenNotificationsByProfileId(profileId);
    }
}
