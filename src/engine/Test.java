package engine;

public class Test {

	public static void main(String args[]) {
		// Test commit comment
		//Board board = new Board("8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50");
		//Board board = new Board("rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2");
		//Board board = new Board("4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk - 0 1");
		//Board board = new Board("8/8/8/4p1K1/2k1P3/8/8/8 b - - 0 1");
		//Board board = new Board("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2 ");
		//Board board = new Board("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1");
		
		//Board board = new Board("rnbqkbnr/p1pppppp/8/8/3pP3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1");
		
		Board board = new Board();
		
		board.squares[4][0] = new Piece(PieceType.KING, PieceColor.WHITE);
		board.squares[7][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
		board.squares[0][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
		board.squares[4][7] = new Piece(PieceType.KING, PieceColor.BLACK);
		board.squares[7][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
		board.squares[0][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
		
		
		board.printBoardGraphic();
		
		CastlingMove cm1 = new CastlingMove(4, 7, 6, 7);
		CastlingMove cm2 = new CastlingMove(4, 7, 2, 7);
		
		board.makeMove(cm1);
		board.printBoardGraphic();
		board.undoMove(cm1);
		board.printBoardGraphic();
		board.makeMove(cm2);
		board.printBoardGraphic();
		board.undoMove(cm2);
		board.printBoardGraphic();

		
	}
	
}
