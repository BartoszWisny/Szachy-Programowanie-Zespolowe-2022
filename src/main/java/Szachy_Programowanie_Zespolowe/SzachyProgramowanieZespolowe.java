package Szachy_Programowanie_Zespolowe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class SzachyProgramowanieZespolowe {
    public static void main(String[] args) {
        SpringApplication.run(SzachyProgramowanieZespolowe.class, args);
    }
}
