package com.app.waki.user.infrastructure.jpa;

import com.app.waki.user.domain.valueObject.Email;
import com.app.waki.user.domain.User;
import com.app.waki.user.domain.valueObject.UserId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface JpaUserDataRepository extends JpaRepository<User, UserId> {
    Optional<User> findByEmail(Email email);
    boolean existsByEmail(Email email);
}
