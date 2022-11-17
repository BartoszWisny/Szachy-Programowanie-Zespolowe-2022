package engine.moves;

import engine.board_and_pieces.PieceType;

public class PromotionMove extends Move {

	private PieceType newPiece;
	
	public PromotionMove(int beginCol, int beginRow, int endCol, int endRow) {
		super(beginCol, beginRow, endCol, endRow);
	}
	
	public PromotionMove(int beginCol, int beginRow, int endCol, int endRow, PieceType newPiece) {
		super(beginCol, beginRow, endCol, endRow);
		this.newPiece = newPiece;
	}
	
	public PieceType getNewPieceType() {
		return this.newPiece;
	}
	
}
