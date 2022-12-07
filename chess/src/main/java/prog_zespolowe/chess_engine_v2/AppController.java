package prog_zespolowe.chess_engine_v2;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class AppController {
	
	@RequestMapping({"/"})
	public String loadUI() {
		//log.info("loading UI");
		return "forward:/index.html";
	}

}