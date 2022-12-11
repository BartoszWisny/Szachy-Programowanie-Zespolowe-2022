package Szachy_Programowanie_Zespolowe.Models;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Game {
    private String gameId;
    private String whiteUid;
    private String blackUid;
    private Date date;
    private List<String> moveList;
    private GameResult gameResult;
}
