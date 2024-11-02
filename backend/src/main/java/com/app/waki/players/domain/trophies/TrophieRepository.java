package com.app.waki.players.domain.trophies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrophieRepository extends JpaRepository<Trophie, Long> {
    List<Trophie> findByPlayerId(Long profileId);

    @Query("SELECT t FROM Trophie t WHERE t.playerId = :playerId AND t.season LIKE %:season%")
    List<Trophie> findByPlayerIdAndSeason(@Param("playerId") Long playerId, @Param("season") String season);
}
