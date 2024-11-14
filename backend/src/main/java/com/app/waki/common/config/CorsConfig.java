package com.app.waki.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
public class CorsConfig implements WebMvcConfigurer {


    private final CorsDeployFrontUrl deployFrontUrls;
    private final CorsLocalFrontUrl localFrontUrl;
    private final CorsDeployBackUrl corsDeployBackUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(deployFrontUrls.getCORS(), localFrontUrl.getCORS_LOCAL(), corsDeployBackUrl.getCORS_BACK())
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders("Authorization");
    }
}
