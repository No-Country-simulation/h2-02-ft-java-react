package com.app.waki.user.infrastructure.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    RequestMatcher publicUrls = new OrRequestMatcher(
            //USER
            new AntPathRequestMatcher("/user/create"),
            new AntPathRequestMatcher("/user/login"),
            //PROFILE
            new AntPathRequestMatcher("/profile/{profileId}"),
            new AntPathRequestMatcher("/profile/predictionByDate/{profileId}"),
            new AntPathRequestMatcher("/profile/validatePrediction/{profileId}"),
            //PREDICTION
            new AntPathRequestMatcher("/prediction/{profileId}"),
            new AntPathRequestMatcher("/prediction/byDate/{profileId}"),
            //API FOOTBALL
            new AntPathRequestMatcher("/match/updateMatches"),
            new AntPathRequestMatcher("/match/getMatches"),
            //SWAGGER
            new AntPathRequestMatcher("/swagger-ui.html"),
            new AntPathRequestMatcher("/v3/api-docs/**"),
            new AntPathRequestMatcher("/swagger-ui/**")
    );
    RequestMatcher adminUrls = new OrRequestMatcher(
            new AntPathRequestMatcher("/user/admin")
    );

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(publicUrls)
                        .permitAll()
                        .requestMatchers(adminUrls).hasRole("ADMIN")
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
