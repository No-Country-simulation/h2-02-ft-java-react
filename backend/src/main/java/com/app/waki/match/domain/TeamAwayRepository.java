package com.app.waki.match.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamAwayRepository extends JpaRepository<TeamAway, Long> {
    Optional<TeamAway> findByName(String name);
}
