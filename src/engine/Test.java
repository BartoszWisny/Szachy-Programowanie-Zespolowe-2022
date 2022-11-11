package engine;

public class Test {

	public static void main(String args[]) {
		
		//https://www.chessprogramming.org/Perft_Results

		//Result 1 (position 2) = 48 OK
		//Board board = new Board("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - ");
		
		//Result 2 (position 3) = 14 OK
		//Board board = new Board("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - -");
		
		//Result 3 (position 4) = 6 OK
		//Board board = new Board("r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1");
		
		//Result 4 (position 5) = 44  OK
		Board board = new Board("rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8");
		
		//Result 5 (position 6) = 46 OK
		//Board board = new Board("r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10");
		
		board.printBoardGraphic();
		
		MoveGenerator mg = new MoveGenerator(board);
		
		Move[] moves = mg.getPossibleMoves(PieceColor.WHITE);
		
		board.printBoardGraphic();
		
		System.out.print(moves.length);
		
	}
	
}
