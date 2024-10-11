package com.app.waki.profile.application;

import com.app.waki.common.events.UserCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProfileServiceImpl {

    @EventListener
    public void onUserCreate (UserCreatedEvent event){
        log.info("el id del nuevo usuario es " + event.id());
    }
}
