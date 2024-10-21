package com.app.waki.notification.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record NotificationId(UUID not_Id) {

    public NotificationId {
        if (not_Id == null) {
            throw new ValidationException("Notification id must not be null.");
        }
    }

    public NotificationId() {
        this(UUID.randomUUID());
    }
}
