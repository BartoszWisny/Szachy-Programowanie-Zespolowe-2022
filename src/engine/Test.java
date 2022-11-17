package engine;

import engine.board_and_pieces.Board;
import engine.board_and_pieces.PieceColor;
import engine.board_and_pieces.PieceType;
import engine.moves.Move;
import engine.moves.MoveGenerator;

public class Test {
	
	public static PieceColor opponentColor(PieceColor color) {
		if(color == PieceColor.WHITE) {
			return PieceColor.BLACK;
		} else {
			return PieceColor.WHITE;
		}
	}

	public static Move[] MadeMoves = new Move[10];

	public static int CountMoves(Board board, int depth, PieceColor color) {

		int sum = 0;
		MoveGenerator mg = new MoveGenerator(board);

		if(depth == 0) {

			return 1;

		} else {

			Move[] moves = mg.getPossibleMoves(color);

			for(Move m : moves) {
				MadeMoves[depth] = m;
				board.makeMove(m);
				sum += CountMoves(board, depth-1, opponentColor(color));
				board.undoMove(m);
			}

			return sum;
		}
	}

	static void evalFunTests() {

	}

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
		
		//board.printBoardGraphic();
		
		//int totalMoves = CountMoves(board, 5, PieceColor.WHITE);


		//board.printBoardGraphic();
		
		//System.out.println(totalMoves);

		System.out.println(PieceType.PAWN.getTypeValue());
		
	}



	
}
