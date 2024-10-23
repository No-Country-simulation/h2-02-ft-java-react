package com.app.waki.notification.infrastructure;

import com.app.waki.notification.application.NotificationServiceImpl;
import com.app.waki.notification.domain.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationServiceImpl service;

    @GetMapping("/{profileId}")
    public ResponseEntity<List<Notification>> getPendingNotificationsByUser(@PathVariable String profileId){

        return ResponseEntity.ok(service.findUnseenNotificationsByProfileId(profileId));
    }


}
