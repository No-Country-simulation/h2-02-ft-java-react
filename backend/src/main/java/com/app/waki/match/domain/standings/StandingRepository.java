package com.app.waki.match.domain.standings;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StandingRepository extends JpaRepository<Standing, Long> {

    List<Standing> findByLeague_leagueId(Long leagueId);

    Optional<Standing> findByLeague_leagueIdAndTeamId(Long leagueId, Integer teamId);
}
