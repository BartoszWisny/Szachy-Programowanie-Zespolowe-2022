package engine.board_and_pieces;

public class Piece {
	
	private PieceType type;
	private PieceColor color;
	
	public Piece(PieceType type, PieceColor color) {
		this.type = type;
		this.color = color;
	}
	
	public PieceType getType() {
		return this.type;
	}
	
	public PieceColor getColor() {
		return this.color;
	}
	
	public void printPiece() {
		if(this.color == PieceColor.WHITE) {
			
			if(this.type == PieceType.PAWN) {
				System.out.print("P");
			} else if (this.type == PieceType.ROOK) {
				System.out.print("R");
			} else if (this.type == PieceType.KNIGHT) {
				System.out.print("N");
			} else if (this.type == PieceType.BISHOP) {
				System.out.print("B");
			} else if (this.type == PieceType.QUEEN) {
				System.out.print("Q");
			} else if (this.type == PieceType.KING) {
				System.out.print("K");
			}
			
		} else {
			
			if(this.type == PieceType.PAWN) {
				System.out.print("p");
			} else if (this.type == PieceType.ROOK) {
				System.out.print("r");
			} else if (this.type == PieceType.KNIGHT) {
				System.out.print("n");
			} else if (this.type == PieceType.BISHOP) {
				System.out.print("b");
			} else if (this.type == PieceType.QUEEN) {
				System.out.print("q");
			} else if (this.type == PieceType.KING) {
				System.out.print("k");
			}
			
		}
	}
	
	public void printPieceGraphic() {
		if(this.color == PieceColor.WHITE) {
			
			if(this.type == PieceType.PAWN) {
				System.out.print("♙");
			} else if (this.type == PieceType.ROOK) {
				System.out.print("♖");
			} else if (this.type == PieceType.KNIGHT) {
				System.out.print("♘");
			} else if (this.type == PieceType.BISHOP) {
				System.out.print("♗");
			} else if (this.type == PieceType.QUEEN) {
				System.out.print("♕");
			} else if (this.type == PieceType.KING) {
				System.out.print("♔");
			}
			
		} else {
			
			if(this.type == PieceType.PAWN) {
				System.out.print("♟");
			} else if (this.type == PieceType.ROOK) {
				System.out.print("♜");
			} else if (this.type == PieceType.KNIGHT) {
				System.out.print("♞");
			} else if (this.type == PieceType.BISHOP) {
				System.out.print("♝");
			} else if (this.type == PieceType.QUEEN) {
				System.out.print("♛");
			} else if (this.type == PieceType.KING) {
				System.out.print("♚");
			}
			
		}
	}
	
}
