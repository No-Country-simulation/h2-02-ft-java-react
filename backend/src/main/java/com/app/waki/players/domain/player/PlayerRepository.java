package com.app.waki.players.domain.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Optional<Player> findByPlayer_ProfileId(Long profileId);

    boolean existsByPlayer_ProfileId(Long profileId);

    @Query("SELECT MIN(s.league.season) FROM Statistics s WHERE s.idPlayer = :playerId")
    Optional<String> findOldestYearByPlayerId(@Param("playerId") Long playerId);

    @Query("SELECT MAX(s.league.season) FROM Statistics s WHERE s.idPlayer = :playerId")
    Optional<String> findNewestYearByPlayerId(@Param("playerId") Long playerId);
}
