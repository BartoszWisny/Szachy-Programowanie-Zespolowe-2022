package Szachy_Programowanie_Zespolowe.Controllers.Private;

import Szachy_Programowanie_Zespolowe.Models.Game;
import Szachy_Programowanie_Zespolowe.Models.User;
import Szachy_Programowanie_Zespolowe.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("gamePrivate")
public class GamePrivateController {
    @Autowired
    private GameService gameService;

    @GetMapping("getUserGames")
    public ResponseEntity getUserGames(@AuthenticationPrincipal User user) {
        try {
            List<Game> games =  gameService.getUserGames(user);

            return ResponseEntity.ok(games);
        }
        catch (ExecutionException executionException) {
            return ResponseEntity.status(500).body(executionException.getMessage());
        }
        catch (InterruptedException interruptedException) {
            return ResponseEntity.status(500).body(interruptedException.getMessage());
        }
    }
}
