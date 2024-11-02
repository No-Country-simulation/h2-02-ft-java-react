package com.app.waki.players.domain.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findByPlayer_ProfileId(Long profileId);

    boolean existsByPlayer_ProfileId(Long profileId);
}
