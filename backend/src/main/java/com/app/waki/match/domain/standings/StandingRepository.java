package com.app.waki.match.domain.standings;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StandingRepository extends JpaRepository<Standing, Long> {

    List<Standing> findByLeague_leagueId(Long leagueId);
}
