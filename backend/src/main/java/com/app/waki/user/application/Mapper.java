package com.app.waki.user.application;

import com.app.waki.user.domain.User;

class Mapper {

    public static UserDto userToUserDTO(User user){

        return new UserDto(user.getId(),user.getUsername(), user.getEmail());
    }
}
