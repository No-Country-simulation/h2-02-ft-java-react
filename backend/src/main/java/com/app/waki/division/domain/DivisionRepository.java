package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.division.domain.valueObject.UserRankingId;

import java.util.List;
import java.util.Optional;

public interface DivisionRepository {

    List<Division> findByLevel(DivisionLevel level);
    Optional<Division> findByUserRankings_UserId(UserRankingId userId);

//    List<UserRanking> getAllUsersPoints();
}
