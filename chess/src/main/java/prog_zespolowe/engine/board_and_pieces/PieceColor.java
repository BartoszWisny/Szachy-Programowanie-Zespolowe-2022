package prog_zespolowe.engine.board_and_pieces;

public enum PieceColor {
	WHITE(1),
	BLACK(-1);

	// color characteristic (black (-) evaluation, white (+) evaluation)
	final private int colorValue;

	PieceColor(int colorValue) {
		this.colorValue =  colorValue;
	}

	public int getColorValue() {
		return this.colorValue;
	}
}
