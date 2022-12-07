package prog_zespolowe.engine.board_and_pieces;

public enum PieceType {
	PAWN(100),
	KNIGHT(320),
	BISHOP(330),
	ROOK(500),
	QUEEN(900),
	KING(20000);

	// piece value in centi-pawns
	final private int typeValue;


	PieceType(int typeValue) {
		this.typeValue = typeValue;
	}

	public int getTypeValue() {
		return this.typeValue;
	}
}
