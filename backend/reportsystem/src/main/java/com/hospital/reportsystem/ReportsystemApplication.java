package com.hospital.reportsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(maxAge = 3600)
@SpringBootApplication
public class ReportsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReportsystemApplication.class, args);
	}

}
