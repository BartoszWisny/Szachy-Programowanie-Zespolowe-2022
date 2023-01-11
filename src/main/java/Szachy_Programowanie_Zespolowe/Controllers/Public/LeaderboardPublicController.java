package Szachy_Programowanie_Zespolowe.Controllers.Public;

import Szachy_Programowanie_Zespolowe.Models.Game;
import Szachy_Programowanie_Zespolowe.Models.LeaderboardEntry;
import Szachy_Programowanie_Zespolowe.Service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("leaderboardPublic")
public class LeaderboardPublicController {
	@Autowired
	private LeaderboardService leaderboardService;
	private LeaderboardService gameService;
	
	@GetMapping("getLeaderboard")
	public ResponseEntity getLeaderboard() {
        try {
            List<LeaderboardEntry> leaderboard =  leaderboardService.getLeaderboard();

            return ResponseEntity.ok(leaderboard);
        }
        catch (ExecutionException executionException) {
            return ResponseEntity.status(500).body(executionException.getMessage());
        }
        catch (InterruptedException interruptedException) {
            return ResponseEntity.status(500).body(interruptedException.getMessage());
        }
	}
	
}
