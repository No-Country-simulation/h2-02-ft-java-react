package com.app.waki.profile.infrastructure.jpa;

import com.app.waki.profile.domain.Profile;
import com.app.waki.profile.domain.valueObject.ProfileUserId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaProfileDataRepository extends JpaRepository<Profile, ProfileUserId> {

}
