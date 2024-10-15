package com.app.waki.user.domain;

import com.app.waki.user.domain.valueObject.Email;
import com.app.waki.user.domain.valueObject.UserId;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    void save(User user);
    Optional<User> findById(UserId userId);
    Optional<User> findByEmail(Email email);
    List<User> findAll();
    boolean existsByEmail(Email email);
}
