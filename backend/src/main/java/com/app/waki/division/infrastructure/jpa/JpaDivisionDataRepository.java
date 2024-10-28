package com.app.waki.division.infrastructure.jpa;

import com.app.waki.division.domain.Division;
import com.app.waki.division.domain.UserRanking;
import com.app.waki.division.domain.valueObject.DivisionId;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.division.domain.valueObject.UserRankingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface JpaDivisionDataRepository extends JpaRepository<Division, DivisionId> {
    @Query("SELECT d FROM Division d WHERE d.division = :level")
    Optional<Division> findByLevel(@Param("level") DivisionLevel level);

    @Query("""
            SELECT r FROM Division d 
            JOIN d.rankings r 
            WHERE r.divisionLevel = (
                SELECT ur.divisionLevel 
                FROM Division div 
                JOIN div.rankings ur 
                WHERE ur.userId = :userId
            )
            ORDER BY r.points DESC
            """)
    List<UserRanking> findByUserRankings_UserId(@Param("userId") UserRankingId userId);

    @Query("SELECT r FROM Division d JOIN d.rankings r WHERE r.userId IN :userIds")
    List<UserRanking> findUserRankingsByUserIds(@Param("userIds") Collection<UserRankingId> userIds);

    @Query("SELECT ur FROM UserRanking ur " +
            "JOIN ur.division d " +
            "WHERE ur.userId = :userRankingId")
    Optional<UserRanking> findUserRankingByUserId(@Param("userRankingId") UserRankingId userRankingId);

}
