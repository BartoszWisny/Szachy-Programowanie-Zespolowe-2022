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
	
	/**
	 *  Metoda zwraca String reprezentujący ruch z promocją piona
	 *  Najpierw podajemy pierwsze pole, następnie jedna spacja, potem końcowe pole,
	 *  spacja i figura, na którą promujemy, np. "e7 e8 q" 
	 *  r - wieża, n - skoczek, q - hetman, b - goniec
	 */
	
	@Override
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
		result += " ";
		
		if(this.newPiece == PieceType.ROOK) {
			result += "r";
		} else if(this.newPiece == PieceType.KNIGHT) {
			result += "n";
		} else if(this.newPiece == PieceType.BISHOP) {
			result += "b";
		} else if(this.newPiece == PieceType.QUEEN) {
			result += "q";
		}
		
		return result;
	}
	
	
}
