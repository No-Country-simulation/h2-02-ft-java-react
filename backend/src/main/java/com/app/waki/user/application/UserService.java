package com.app.waki.user.application;

public interface UserService {
    UserDto createUser(CreateUserRequestDto userRequest);
    JwtAuthToken loginUserAuthentication(LoginUserAuthDto loginUserCredentials);
}
