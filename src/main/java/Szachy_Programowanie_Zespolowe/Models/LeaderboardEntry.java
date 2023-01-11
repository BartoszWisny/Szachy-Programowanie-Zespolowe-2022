package Szachy_Programowanie_Zespolowe.Models;

import lombok.Data;

@Data
public class LeaderboardEntry {
	private int draws;
	private int gamesLost;
	private int gamesWon;
	private int points;
	private String userID;
	private String username;
}
