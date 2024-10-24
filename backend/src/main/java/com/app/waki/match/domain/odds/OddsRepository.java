package com.app.waki.match.domain.odds;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OddsRepository extends JpaRepository<Odds, Long> {

    Odds findByFixture_FixtureId(Long fixtureId);

    List<Odds> findByFixture_FixtureIdIn(List<Long> fixtureIds);
}