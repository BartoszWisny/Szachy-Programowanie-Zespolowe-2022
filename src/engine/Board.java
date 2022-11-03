package engine;

public class Board {
	
	private Piece[][] squares;
	
	public Board() {
		this.squares = new Piece[8][8];
	}
	
	public void setup() {
		
		for(int i=0; i<=7; i++) {
			this.squares[i][1] = new Piece(PieceType.PAWN, PieceColor.WHITE);
			this.squares[i][6] = new Piece(PieceType.PAWN, PieceColor.BLACK);
		}
		
		this.squares[0][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
		this.squares[1][0] = new Piece(PieceType.KNIGHT, PieceColor.WHITE);
		this.squares[2][0] = new Piece(PieceType.BISHOP, PieceColor.WHITE);
		this.squares[3][0] = new Piece(PieceType.QUEEN, PieceColor.WHITE);
		this.squares[4][0] = new Piece(PieceType.KING, PieceColor.WHITE);
		this.squares[5][0] = new Piece(PieceType.BISHOP, PieceColor.WHITE);
		this.squares[6][0] = new Piece(PieceType.KNIGHT, PieceColor.WHITE);
		this.squares[7][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
		
		this.squares[0][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
		this.squares[1][7] = new Piece(PieceType.KNIGHT, PieceColor.BLACK);
		this.squares[2][7] = new Piece(PieceType.BISHOP, PieceColor.BLACK);
		this.squares[3][7] = new Piece(PieceType.QUEEN, PieceColor.BLACK);
		this.squares[4][7] = new Piece(PieceType.KING, PieceColor.BLACK);
		this.squares[5][7] = new Piece(PieceType.BISHOP, PieceColor.BLACK);
		this.squares[6][7] = new Piece(PieceType.KNIGHT, PieceColor.BLACK);
		this.squares[7][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
		
	}
	
	public void printBoard() {
		
		
		for(int i=7; i>=0; i--) {
			for(int j=0; j<=7; j++) {
				
				if(this.squares[j][i] == null) {
					System.out.print("* ");
				} else {
					this.squares[j][i].printPiece();
					System.out.print(" ");
				}
				
			}
			
			System.out.println("");
		}
		
	}
	
}
