package com.app.waki.user.infrastructure.controller;

import com.app.waki.user.application.dto.CreateUserRequestDto;
import com.app.waki.user.application.dto.JwtAuthToken;
import com.app.waki.user.application.dto.LoginUserAuthDto;
import com.app.waki.user.application.dto.UserDto;
import com.app.waki.user.application.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<UserDto> createUser (@RequestBody CreateUserRequestDto createUserRequestDto){

        return ResponseEntity.ok(userService.createUser(createUserRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthToken> loginUser (@RequestBody LoginUserAuthDto loginUserAuthDto){

        return ResponseEntity.ok(userService.loginUserAuthentication(loginUserAuthDto));
    }

    @PostMapping("/admin")
    public ResponseEntity<String> admin (@RequestBody String name){

        return ResponseEntity.ok("Hola " + name);
    }
}
