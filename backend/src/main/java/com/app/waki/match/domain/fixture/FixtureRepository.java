package com.app.waki.match.domain.fixture;

import com.app.waki.match.domain.league.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FixtureRepository extends JpaRepository<Fixture, Long> {
    @Query("SELECT f FROM Fixture f WHERE f.league.id = :leagueId AND f.date BETWEEN :startDate AND :endDate")
    List<Fixture> findByLeagueAndDateBetween(@Param("leagueId") Long leagueId,
                                             @Param("startDate") LocalDateTime startDate,
                                             @Param("endDate") LocalDateTime endDate);

    List<Fixture> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
