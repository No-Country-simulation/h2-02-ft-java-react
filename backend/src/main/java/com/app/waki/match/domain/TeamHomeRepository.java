package com.app.waki.match.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamHomeRepository extends JpaRepository<TeamHome, Long> {
    Optional<TeamHome> findByName(String name);
}
