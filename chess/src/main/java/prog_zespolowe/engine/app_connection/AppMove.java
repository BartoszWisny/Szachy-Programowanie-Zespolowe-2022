package prog_zespolowe.engine.app_connection;

import prog_zespolowe.engine.board_and_pieces.*;
import prog_zespolowe.engine.eval_function.ConstValues;
import prog_zespolowe.engine.utils.*;
import prog_zespolowe.engine.moves.*;
import prog_zespolowe.engine.beta_chess_engine.*;

public class AppMove {
	
	public static String getBestMove(String FEN) {
		
		Board b = BoardUtils.createFromFEN2(FEN);
		EngineEval ee = Engine.alphaBetaMax(b, ConstValues.LOSING_SCORE, ConstValues.WINNING_SCORE, 4);
		Move m = ee.outMove();
		
		return m.moveString();
	}
	
	public static String getBestMoveDepth(String FEN, int depth) {
		
		Board b = BoardUtils.createFromFEN2(FEN);
		EngineEval ee = Engine.alphaBetaMax(b, ConstValues.LOSING_SCORE, ConstValues.WINNING_SCORE, depth);
		Move m = ee.outMove();
		
		return m.moveString();
	}
	
}
