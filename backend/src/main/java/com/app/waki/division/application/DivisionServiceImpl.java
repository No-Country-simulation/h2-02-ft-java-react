package com.app.waki.division.application;

import com.app.waki.common.events.UserCreatedEvent;
import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.division.domain.Division;
import com.app.waki.division.domain.DivisionRepository;
import com.app.waki.division.domain.UserRanking;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.profile.domain.Profile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class DivisionServiceImpl {

    private final DivisionRepository repository;
    private final ApplicationEventPublisher publisher;

    @ApplicationModuleListener
    void onUserCreate (UserCreatedEvent event){

        log.info("nuevo user ranking con id: " + event.id());
        Division limboDivision = repository.findByLevel(DivisionLevel.LIMBO)
                .orElseThrow(() -> new EntityNotFoundException("Division not founded"));
        limboDivision.createUserRanking(event.id(), event.username());

        repository.save(limboDivision);
    }
}
