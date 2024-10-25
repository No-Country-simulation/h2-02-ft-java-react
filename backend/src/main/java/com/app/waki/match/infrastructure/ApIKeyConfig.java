package com.app.waki.match.infrastructure;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "apikey")
@Data
public class ApIKeyConfig {
    private String API_TOKEN;
}
