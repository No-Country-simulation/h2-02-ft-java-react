package com.app.waki.division.application;

import com.app.waki.common.events.UserCreatedEvent;
import com.app.waki.common.exceptions.EntityNotFoundException;
import com.app.waki.division.application.dto.UserRankingDto;
import com.app.waki.division.application.utils.MapperDivision;
import com.app.waki.division.domain.Division;
import com.app.waki.division.domain.DivisionRepository;
import com.app.waki.division.domain.UserRanking;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.division.domain.valueObject.UserRankingId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;


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

    @Transactional(readOnly = true)
    public UserRankingDto getUserRanking(UUID userRankingId){

        UserRanking findUser = repository.findUserRankingByUserId(new UserRankingId(userRankingId))
                .orElseThrow(() -> new EntityNotFoundException("User ranking not found with id: " + userRankingId));

        return MapperDivision.userRankingToDto(findUser);
    }

    @Transactional(readOnly = true)
    public List<UserRankingDto> getUserRankingList(UUID userRankingId){

        return repository.findByUserRankings_UserId(new UserRankingId(userRankingId))
                .stream()
                .map(MapperDivision::userRankingToDto)
                .toList();
    }
}
