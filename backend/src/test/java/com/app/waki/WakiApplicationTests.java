package com.app.waki;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.modulith.core.ApplicationModules;
import org.springframework.modulith.docs.Documenter;

@SpringBootTest
class WakiApplicationTests {

	ApplicationModules modules = ApplicationModules.of(WakiApplication.class);

	@Test
	void verifyModularity(){
		modules.forEach(System.out::println);
		modules.verify();
	}

	@Test
	void createModuleDocumentation() {
		new Documenter(modules)
				.writeIndividualModulesAsPlantUml()
				.writeModulesAsPlantUml();
	}

	@Test
	void contextLoads() {

	}

}
