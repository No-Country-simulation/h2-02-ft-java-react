package com.app.waki.user.infrastructure.jpa;

import com.app.waki.user.domain.valueObject.Email;
import com.app.waki.user.domain.User;
import com.app.waki.user.domain.valueObject.UserId;
import com.app.waki.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
class JpaUserRepositoryImpl implements UserRepository {

    private final JpaUserDataRepository repository;

    @Override
    public void save(User user) {
        repository.save(user);
    }

    @Override
    public Optional<User> findById(UserId userId) {
        return repository.findById(userId);
    }

    @Override
    public Optional<User> findByEmail(Email email) {
        return repository.findByEmail(email);
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public boolean existsByEmail(Email email) {
        return repository.existsByEmail(email);
    }
}
