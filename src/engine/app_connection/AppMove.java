package engine.app_connection;

import engine.board_and_pieces.*;
import engine.utils.*;
import engine.moves.*;
import engine.beta_chess_engine.*;

public class AppMove {
	
	public static String getBestMove(String FEN) {
		
		Board b = BoardUtils.createFromFEN(FEN);
		EngineEval ee = Engine.findBestMove(b, 5);
		Move m = ee.outMove();
		
		return m.moveString();
	}
	
}
