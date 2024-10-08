package com.app.waki.user.application;

import com.app.waki.user.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public UserDto createUser(CreateUserRequestDto userRequest){

        if (userRepository.existsByEmail(new Email(userRequest.email()))) {
            throw new EmailNotAvailableException("Email not available.");
        }
        Password validatePassword = new Password(userRequest.password());
        User newUser = User.createUser(
                userRequest.username(),
                userRequest.email(),
                passwordEncoder.encode(validatePassword.password()));
        userRepository.save(newUser);

        return Mapper.userToUserDTO(newUser);
    }

    public JwtAuthToken loginUserAuthentication(LoginUserAuthDto loginUserCredentials){

        User findUser = userRepository.findByEmail(new Email(loginUserCredentials.email()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginUserCredentials.email(), loginUserCredentials.password()
                )
        );
        var userAuth = new UserAuth(findUser);
        var jwtToken = tokenService.generateToken(userAuth);

        return new JwtAuthToken(jwtToken);
    }

}
