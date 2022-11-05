package engine;

public class Move {
	
	int beginCol;
	int beginRow;
	
	int endCol;
	int endRow;
	
	Piece takenPiece;
	
	public Move(int beginCol, int beginRow, int endCol, int endRow) {
		this.beginCol = beginCol;
		this.beginRow = beginRow;
		this.endCol = endCol;
		this.endRow = endRow;
		this.takenPiece = null;
	}
	
	public void printMove() {
		System.out.println("Col: " + beginCol + " Row: " + beginRow + " -> Col: " + endCol + " Row: " + endRow);
	}
	
}
