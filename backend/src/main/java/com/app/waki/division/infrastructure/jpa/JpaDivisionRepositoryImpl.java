package com.app.waki.division.infrastructure.jpa;

import com.app.waki.division.domain.Division;
import com.app.waki.division.domain.DivisionRepository;
import com.app.waki.division.domain.UserRanking;
import com.app.waki.division.domain.valueObject.DivisionId;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.division.domain.valueObject.UserRankingId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JpaDivisionRepositoryImpl implements DivisionRepository {

    private final JpaDivisionDataRepository repository;

    @Override
    public void save(Division division) {
        repository.save(division);
    }

    @Override
    public Optional<Division> findById(DivisionId divisionId) {
        return repository.findById(divisionId);
    }

    @Override
    public List<Division> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Division> findByLevel(DivisionLevel level) {
        return repository.findByLevel(level);
    }

    @Override
    public Optional<Division> findByUserRankings_UserId(UserRankingId userId) {
        return repository.findByUserRankings_UserId(userId);
    }

    @Override
    public boolean isDivisionsTableEmpty() {
        return repository.count() == 0;
    }

    @Override
    public void saveAll(List<Division> divisions) {
        repository.saveAll(divisions);
    }

    @Override
    public List<UserRanking> findUserRankingsByUserIds(Collection<UserRankingId> userIds) {
        return repository.findUserRankingsByUserIds(userIds);
    }

//    @Override
//    public List<UserRanking> getAllUsersPoints() {
//        return repository.getAllUsersPoints();
//    }
}
