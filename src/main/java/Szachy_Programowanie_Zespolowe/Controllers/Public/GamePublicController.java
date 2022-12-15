package Szachy_Programowanie_Zespolowe.Controllers.Public;

import Szachy_Programowanie_Zespolowe.Models.Game;
import Szachy_Programowanie_Zespolowe.Models.GameNotFoundException;
import Szachy_Programowanie_Zespolowe.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("gamePublic")
public class GamePublicController {
    @Autowired
    private GameService gameService;

    @GetMapping("getAllGames")
    public ResponseEntity getAllGames() {
        try {
            List<Game> games =  gameService.getAllGames();

            return ResponseEntity.ok(games);
        }
        catch (ExecutionException executionException) {
            return ResponseEntity.status(500).body(executionException.getMessage());
        }
        catch (InterruptedException interruptedException) {
            return ResponseEntity.status(500).body(interruptedException.getMessage());
        }
    }

    @GetMapping("getGameByGameId")
    public ResponseEntity getGameByGameId(String gameId) {
        try {
            Game game = gameService.getGameByGameId(gameId);

            return ResponseEntity.ok(game);
        }
        catch (ExecutionException executionException) {
            return ResponseEntity.status(500).body(executionException.getMessage());
        }
        catch (InterruptedException interruptedException) {
            return ResponseEntity.status(500).body(interruptedException.getMessage());
        }
        catch (GameNotFoundException gameNotFoundException) {
            return ResponseEntity.status(404).body(gameNotFoundException.getMessage());
        }
    }
}
