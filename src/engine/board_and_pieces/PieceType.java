package engine.board_and_pieces;

public enum PieceType {
	PAWN(100),
	KNIGHT(300),
	BISHOP(330),
	ROOK(500),
	QUEEN(1000),
	KING(10000);

	final private int typeValue;
	PieceType(int typeValue) {
		this.typeValue = typeValue;
	}

	public int getTypeValue() {
		return this.typeValue;
	}
}
