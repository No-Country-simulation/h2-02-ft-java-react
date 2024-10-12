package com.app.waki.profile.infrastructure.jpa;

import com.app.waki.profile.domain.Profile;
import com.app.waki.profile.domain.valueObjects.ProfileUserId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaProfileDataRepository extends JpaRepository<Profile, ProfileUserId> {


}
