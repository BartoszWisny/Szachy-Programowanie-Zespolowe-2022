package engine.board_and_pieces;

public class Piece {

	private final PieceType type;
	private final PieceColor color;
	private final int value;

	public Piece(PieceType type, PieceColor color) {
		this.type = type;
		this.color = color;

		this.value = type.getTypeValue() *
					 color.getColorValue();
	}

	/**
	 * Copy constructor - to create a new Piece based on another one.
	 * @param anotherPiece - the piece to copy.
	 */
	public Piece(Piece anotherPiece) {
		this.type = anotherPiece.getType();
		this.color = anotherPiece.getColor();
		this.value = anotherPiece.getValue();
	}


	public PieceType getType() {
		return this.type;
	}

	public PieceColor getColor() {
		return this.color;
	}

	public int getValue() {
		return this.value;
	}

	public void printPiece() {
		if (this.color == PieceColor.WHITE) {
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
