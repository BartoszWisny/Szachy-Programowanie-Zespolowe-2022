package prog_zespolowe.engine;

import java.util.List;

import prog_zespolowe.engine.board_and_pieces.Board;
import prog_zespolowe.engine.board_and_pieces.Piece;
import prog_zespolowe.engine.board_and_pieces.PieceColor;
import prog_zespolowe.engine.board_and_pieces.PieceType;
import prog_zespolowe.engine.eval_function.ConstValues;
import prog_zespolowe.engine.moves.*;
import prog_zespolowe.engine.moves.PromotionMove;
import prog_zespolowe.engine.utils.BoardUtils;
import prog_zespolowe.engine.moves.MoveGenerator;
import prog_zespolowe.engine.beta_chess_engine.*;


public class Test {
	
	public static PieceColor opponentColor(PieceColor color) {
		if(color == PieceColor.WHITE) {
			return PieceColor.BLACK;
		} else {
			return PieceColor.WHITE;
		}
	}

	public static Move[] MadeMoves = new Move[10];



	public static void main(String args[]) {
		
		//https://www.chessprogramming.org/Perft_Results

		//Result 1.1 (position 2) = 48 OK       Result 1.2 (position 2) = 2039 OK 
		//Result 1.3 (position 2) = 97862 OK    Result 1.4 (position 2) = 4085603 OK
		//Board board = new Board("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - ");
		
		//Result 2.1 (position 3) = 14 OK		Result 2.2 (position 3) = 191 OK
		//Result 2.3 (position 3) = 2812 OK	    Result 2.4 (position 3) = 43238 OK
		//Board board = new Board("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - -");
		
		//Result 3.1 (position 4) = 6 OK	    Result 3.2 (position 4) = 264 OK
		//Result 3.3 (position 4) = 9467 OK	  	Result 3.4 (position 4) = 422333 OK	 
		//Board board = new Board("r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1");
		
		//Result 4.1 (position 5) = 44  OK      Result 4.2 (position 5) = 1486 OK
		//Result 4.3 (position 5) = 62379  OK   Result 4.4 (position 5) = 2103487  OK 
		//Board board = new Board("rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8");
		
		//Result 5.1 (position 6) = 46 OK       Result 5.2 (position 6) = 2079 OK
		//Result 5.3 (position 6) = 89890 OK 	Result 5.4 (position 6) = 3894594 OK
		//Board board = new Board("r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10");
		
//		Move m2 = new PromotionMove(1, 3, 4, 0, PieceType.QUEEN);
//		
//		System.out.println(m2.moveString());
		
		//Board b = BoardUtils.createFromFEN2("rnbqkbnr_pp1ppppp_8_2p5_4P3_5N2_PPPP1PPP_RNBQKB1R b KQkq - 1 2");
		//Board b = BoardUtils.createFromFEN2("r3k2r_Pppp1ppp_1b3nbN_nP6_BBP1P3_q4N2_Pp1P2PP_R2Q1RK1 w kq - 0 1");
		
		Board b = BoardUtils.createFromFEN("r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1");
		//Board b = BoardUtils.createFromFEN("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - ");
		
		BoardUtils.printBoard(b);
		
		Engine.alphaBetaMax(b, ConstValues.LOSING_SCORE, ConstValues.WINNING_SCORE, 3);
		
		System.out.println("Done");

		
	}



	
}
