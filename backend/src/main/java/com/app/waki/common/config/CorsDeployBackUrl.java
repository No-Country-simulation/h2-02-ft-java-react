package com.app.waki.common.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "corslocal")
@Data
public class CorsDeployBackUrl {
    private String CORS_BACK;
}
