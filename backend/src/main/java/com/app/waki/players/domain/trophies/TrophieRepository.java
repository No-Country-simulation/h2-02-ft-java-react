package com.app.waki.players.domain.trophies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TrophieRepository extends JpaRepository<Trophie, Long> {
    List<Trophie> findByPlayerId(Long profileId);

    @Query("SELECT t FROM Trophie t WHERE t.playerId = :playerId AND t.season LIKE %:season%")
    List<Trophie> findByPlayerIdAndSeason(@Param("playerId") Long playerId, @Param("season") String season);

    @Query("SELECT MIN(t.season) FROM Trophie t WHERE t.playerId = :playerId")
    Optional<String> findOldestYearByPlayerId(@Param("playerId") Long playerId);

    @Query("SELECT MAX(t.season) FROM Trophie t WHERE t.playerId = :playerId")
    Optional<String> findNewestYearByPlayerId(@Param("playerId") Long playerId);
}
