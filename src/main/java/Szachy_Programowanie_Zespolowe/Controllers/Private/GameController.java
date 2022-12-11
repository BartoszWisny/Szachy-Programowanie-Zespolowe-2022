package Szachy_Programowanie_Zespolowe.Controllers.Private;

import Szachy_Programowanie_Zespolowe.Models.Game;
import Szachy_Programowanie_Zespolowe.Models.GameResult;
import Szachy_Programowanie_Zespolowe.Models.User;
import Szachy_Programowanie_Zespolowe.Service.GameService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.WriteResult;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("gamePrivate")
public class GameController {
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
