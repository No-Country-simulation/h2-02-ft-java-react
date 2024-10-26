package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.DivisionId;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.division.domain.valueObject.UserRankingId;
import com.app.waki.profile.domain.Profile;
import com.app.waki.profile.domain.valueObject.ProfileUserId;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface DivisionRepository {
    void save(Division division);
    Optional<Division> findById(DivisionId divisionId);
    List<Division> findAll();

    Optional<Division> findByLevel(DivisionLevel level);
    Optional<Division> findByUserRankings_UserId(UserRankingId userId);

    boolean isDivisionsTableEmpty();

    void saveAll(List<Division> divisions);

    List<UserRanking> findUserRankingsByUserIds(Collection<UserRankingId> userIds);
}
