package com.app.waki.user.infrastructure;

import com.app.waki.user.application.*;
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

    @GetMapping("/admin")
    public ResponseEntity<String> admin (@RequestBody String name){

        return ResponseEntity.ok("Hola " + name);
    }
}
