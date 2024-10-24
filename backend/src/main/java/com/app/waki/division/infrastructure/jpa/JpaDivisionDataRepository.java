package com.app.waki.division.infrastructure.jpa;

import com.app.waki.division.domain.Division;
import com.app.waki.division.domain.UserRanking;
import com.app.waki.division.domain.valueObject.DivisionId;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.division.domain.valueObject.UserRankingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaDivisionDataRepository extends JpaRepository<Division, DivisionId> {
    @Query("SELECT d FROM Division d WHERE d.division = :level")
    List<Division> findByLevel(@Param("level") DivisionLevel level);

    @Query("SELECT d FROM Division d JOIN d.rankings r WHERE r.userId = :userId")
    Optional<Division> findByUserRankings_UserId(@Param("userId") UserRankingId userId);

//    @Query("SELECT new com.app.waki.division.domain.UserPoints(r.userId, r.points) " +
//            "FROM UserRanking r GROUP BY r.userId")
//    List<UserRanking> getAllUsersPoints();
}
