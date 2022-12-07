package prog_zespolowe.chess_engine_v2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class ChessEngineV2Application {

	public static void main(String[] args) {
		SpringApplication.run(ChessEngineV2Application.class, args);
	}

}
