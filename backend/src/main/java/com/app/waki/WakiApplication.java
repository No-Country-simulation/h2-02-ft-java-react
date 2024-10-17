package com.app.waki;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling  // Habilita la ejecución de tareas programadas
public class WakiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WakiApplication.class, args);
	}

}
