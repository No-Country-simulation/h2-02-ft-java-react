package com.app.waki.user.application.service;

import com.app.waki.user.application.dto.CreateUserRequestDto;
import com.app.waki.user.application.dto.JwtAuthToken;
import com.app.waki.user.application.dto.LoginUserAuthDto;
import com.app.waki.user.application.dto.UserDto;

public interface UserService {
    UserDto createUser(CreateUserRequestDto userRequest);
    JwtAuthToken loginUserAuthentication(LoginUserAuthDto loginUserCredentials);
}
