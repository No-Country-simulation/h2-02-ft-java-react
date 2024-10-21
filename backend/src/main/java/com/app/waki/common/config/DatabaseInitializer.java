package com.app.waki.common.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;

    public DatabaseInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        // Modifica la columna serialized_event a LONGTEXT para poder guardar eventos mas grandes.
        jdbcTemplate.execute("ALTER TABLE event_publication MODIFY COLUMN serialized_event LONGTEXT");
    }
}
