package com.app.waki.user.application.utils;

import com.app.waki.user.application.dto.UserDto;
import com.app.waki.user.domain.User;

public class UserMapper {

    public static UserDto userToUserDTO(User user){

        return new UserDto(user.getId(),user.getUsername(), user.getEmail());
    }
}
