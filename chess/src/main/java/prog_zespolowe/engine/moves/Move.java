package prog_zespolowe.engine.moves;

import prog_zespolowe.engine.board_and_pieces.Piece;

public class Move {
	
	public int beginCol;
	public int beginRow;
	
	public int endCol;
	public int endRow;
	
	public Piece takenPiece;
	
	private boolean savedWhiteKingsideCastling;
	private boolean savedWhiteQueensideCastling;
	private boolean savedBlackKingsideCastling;
	private boolean savedBlackQueensideCastling;
	
	private boolean savedEnPassant;
	private int savedEnPassantTargetCol;
	private int savedEnPassantTargetRow;
	
	public boolean isSavedWhiteKingsideCastling() {
		return savedWhiteKingsideCastling;
	}

	public void setSavedWhiteKingsideCastling(boolean savedWhiteKingsideCastling) {
		this.savedWhiteKingsideCastling = savedWhiteKingsideCastling;
	}

	public boolean isSavedWhiteQueensideCastling() {
		return savedWhiteQueensideCastling;
	}

	public void setSavedWhiteQueensideCastling(boolean savedWhiteQueensideCastling) {
		this.savedWhiteQueensideCastling = savedWhiteQueensideCastling;
	}

	public boolean isSavedBlackKingsideCastling() {
		return savedBlackKingsideCastling;
	}

	public void setSavedBlackKingsideCastling(boolean savedBlackKingsideCastling) {
		this.savedBlackKingsideCastling = savedBlackKingsideCastling;
	}

	public boolean isSavedBlackQueensideCastling() {
		return savedBlackQueensideCastling;
	}

	public void setSavedBlackQueensideCastling(boolean savedBlackQueensideCastling) {
		this.savedBlackQueensideCastling = savedBlackQueensideCastling;
	}

	public boolean isSavedEnPassant() {
		return savedEnPassant;
	}

	public void setSavedEnPassant(boolean savedEnPassant) {
		this.savedEnPassant = savedEnPassant;
	}

	public int getSavedEnPassantTargetCol() {
		return savedEnPassantTargetCol;
	} 

	public void setSavedEnPassantTargetCol(int savedEnPassantTargetCol) {
		this.savedEnPassantTargetCol = savedEnPassantTargetCol;
	}
 
	public int getSavedEnPassantTargetRow() {
		return savedEnPassantTargetRow;
	}

	public void setSavedEnPassantTargetRow(int savedEnPassantTargetRow) {
		this.savedEnPassantTargetRow = savedEnPassantTargetRow;
	}
	
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
	
	/**
	 *  Metoda zwraca String reprezentujący ruch.
	 *  Najpierw podajemy pierwsze pole, następnie jedna spacja,
	 *  potem końcowe pole, np. "e5 e1" 
	 */
	
	public String moveString() {
		
		String result = "";
		
		if(this.beginCol == 0) {
			result += "a";
		} else if(this.beginCol == 1) {
			result += "b";
		} else if(this.beginCol == 2) {
			result += "c";
		} else if(this.beginCol == 3) {
			result += "d";
		} else if(this.beginCol == 4) {
			result += "e";
		} else if(this.beginCol == 5) {
			result += "f";
		} else if(this.beginCol == 6) {
			result += "g";
		} else if(this.beginCol == 7) {
			result += "h";
		}
		
		result += Integer.toString(beginRow+1);
		result += " ";
		
		if(this.endCol == 0) {
			result += "a";
		} else if(this.endCol == 1) {
			result += "b";
		} else if(this.endCol == 2) {
			result += "c";
		} else if(this.endCol == 3) {
			result += "d";
		} else if(this.endCol == 4) {
			result += "e";
		} else if(this.endCol == 5) {
			result += "f";
		} else if(this.endCol == 6) {
			result += "g";
		} else if(this.endCol == 7) {
			result += "h";
		}
		
		result += Integer.toString(endRow+1);
		
		return result;
	}
	
}
