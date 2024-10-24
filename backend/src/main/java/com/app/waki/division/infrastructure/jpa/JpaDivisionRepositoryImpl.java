package com.app.waki.division.infrastructure.jpa;

import com.app.waki.division.domain.Division;
import com.app.waki.division.domain.DivisionRepository;
import com.app.waki.division.domain.UserRanking;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.division.domain.valueObject.UserRankingId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JpaDivisionRepositoryImpl implements DivisionRepository {

    private final JpaDivisionDataRepository repository;
    @Override
    public List<Division> findByLevel(DivisionLevel level) {
        return repository.findByLevel(level);
    }

    @Override
    public Optional<Division> findByUserRankings_UserId(UserRankingId userId) {
        return repository.findByUserRankings_UserId(userId);
    }

//    @Override
//    public List<UserRanking> getAllUsersPoints() {
//        return repository.getAllUsersPoints();
//    }
}
