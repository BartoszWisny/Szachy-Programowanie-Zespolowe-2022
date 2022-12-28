package engine.board_and_pieces;

import engine.eval_function.ConstValues;


public class Board {

	public Piece[][] squares;
	public PieceColor activeColor;

	private boolean whiteKingsideCastling;
	private boolean whiteQueensideCastling;
	private boolean blackKingsideCastling;
	private boolean blackQueensideCastling;

	private boolean enPassant;
	private int enPassantTargetCol;
	private int enPassantTargetRow;
	
	private int whiteKingCol;
	private int whiteKingRow;
	private int blackKingCol;
	private int blackKingRow;

	private boolean isWhiteKingAttacked;
	private boolean isBlackKingAttacked;

	public Board() {
		this.squares = new Piece[ConstValues.BOARD_ROWS][ConstValues.BOARD_COLS];
	}

	/**
	 * Copy constructor - creates a new board based on another one.
	 * @param anotherBoard - the board we copy
	 */
	public Board(Board anotherBoard) {
		this.squares = new Piece[ConstValues.BOARD_ROWS][ConstValues.BOARD_COLS];
		for (int row = 0; row < ConstValues.BOARD_ROWS; row ++) {
			for (int column = 0; column < ConstValues.BOARD_COLS; column++) {
				this.squares[row][column] = (anotherBoard.squares[row][column] == null) ? null : new Piece(anotherBoard.squares[row][column]);
			}
		}

		this.activeColor = anotherBoard.activeColor;

		this.whiteKingsideCastling = anotherBoard.isWhiteKingsideCastling();
		this.whiteQueensideCastling = anotherBoard.isWhiteQueensideCastling();
		this.blackKingsideCastling = anotherBoard.isBlackKingsideCastling();
		this.blackQueensideCastling = anotherBoard.isBlackQueensideCastling();

		this.enPassant = anotherBoard.getEnPassant();
		this.enPassantTargetCol = anotherBoard.getEnPassantTargetCol();
		this.enPassantTargetRow = anotherBoard.getEnPassantTargetRow();
	}


	public boolean isWhiteKingsideCastling() {
		return whiteKingsideCastling;
	}

	public void setWhiteKingsideCastling(boolean whiteKingsideCastling) {
		this.whiteKingsideCastling = whiteKingsideCastling;
	}

	public boolean isWhiteQueensideCastling() {
		return whiteQueensideCastling;
	}

	public void setWhiteQueensideCastling(boolean whiteQueensideCastling) {
		this.whiteQueensideCastling = whiteQueensideCastling;
	}

	public boolean isBlackKingsideCastling() {
		return blackKingsideCastling;
	}

	public void setBlackKingsideCastling(boolean blackKingsideCastling) {
		this.blackKingsideCastling = blackKingsideCastling;
	}

	public boolean isBlackQueensideCastling() {
		return blackQueensideCastling;
	}

	public void setBlackQueensideCastling(boolean blackQueensideCastling) {
		this.blackQueensideCastling = blackQueensideCastling;
	}
	
	public boolean getEnPassant() {
		return this.enPassant;
	}
	
	public int getEnPassantTargetCol() {
		return this.enPassantTargetCol;
	}
	
	public int getEnPassantTargetRow() {
		return this.enPassantTargetRow;
	}

	public void setEnPassant(boolean b) {
		this.enPassant = b;
	}
	
	public void setEnPassantTargetCol(int i) {
		this.enPassantTargetCol = i;
	}
	
	public void setEnPassantTargetRow(int i) {
		this.enPassantTargetRow = i;
	}

	public int getWhiteKingCol() {
		return whiteKingCol;
	}

	public void setWhiteKingCol(int whiteKingCol) {
		this.whiteKingCol = whiteKingCol;
	}

	public int getWhiteKingRow() {
		return whiteKingRow;
	}

	public void setWhiteKingRow(int whiteKingRow) {
		this.whiteKingRow = whiteKingRow;
	}

	public int getBlackKingCol() {
		return blackKingCol;
	}

	public void setBlackKingCol(int blackKingCol) {
		this.blackKingCol = blackKingCol;
	}

	public int getBlackKingRow() {
		return blackKingRow;
	}

	public void setBlackKingRow(int blackKingRow) {
		this.blackKingRow = blackKingRow;
	}

	public boolean isWhiteKingAttacked() {
		return isWhiteKingAttacked;
	}

	public void setWhiteKingAttacked(boolean isWhiteKingAttacked) {
		this.isWhiteKingAttacked = isWhiteKingAttacked;
	}

	public boolean isBlackKingAttacked() {
		return isBlackKingAttacked;
	}

	public void setBlackKingAttacked(boolean isBlackKingAttacked) {
		this.isBlackKingAttacked = isBlackKingAttacked;
	}
}
