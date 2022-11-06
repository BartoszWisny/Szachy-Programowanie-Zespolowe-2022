package engine;

public class Board {
	
	public Piece[][] squares;
	
	private PieceColor activeColor;
	
	private boolean whiteKingsideCastling;
	private boolean whiteQueensideCastling;
	private boolean blackKingsideCastling;
	private boolean blackQueensideCastling;
	
	private boolean enPassant;
	private int enPassantTargetCol;
	private int enPassantTargetRow;
	
	public Board() {
		this.squares = new Piece[8][8];
	}
	
	public Board(String FEN) {
		
		this.squares = new Piece[8][8];
		
		String[] elements = FEN.split(" ");
		
		String[] rows = elements[0].split("/");
		
		int colIndex;
		
		for(int i=0; i<=7; i++) {
			colIndex = 0;
			for(int j=0; j < rows[i].length(); j++) {
				
				if(rows[i].charAt(j) == 'p') {
					this.squares[colIndex][7-i] = new Piece(PieceType.PAWN, PieceColor.BLACK);
					colIndex++;
				} else if(rows[i].charAt(j) == 'r') {
					this.squares[colIndex][7-i] = new Piece(PieceType.ROOK, PieceColor.BLACK);
					colIndex++;
				} else if (rows[i].charAt(j) == 'n') {
					this.squares[colIndex][7-i] = new Piece(PieceType.KNIGHT, PieceColor.BLACK);
					colIndex++;
				}  else if (rows[i].charAt(j) == 'b') {
					this.squares[colIndex][7-i] = new Piece(PieceType.BISHOP, PieceColor.BLACK);
					colIndex++;
				}  else if (rows[i].charAt(j) == 'q') {
					this.squares[colIndex][7-i] = new Piece(PieceType.QUEEN, PieceColor.BLACK); 
					colIndex++;
				}  else if (rows[i].charAt(j) == 'k') {
					this.squares[colIndex][7-i] = new Piece(PieceType.KING, PieceColor.BLACK); 
					colIndex++;
				} else if(rows[i].charAt(j) == 'P') {
					this.squares[colIndex][7-i] = new Piece(PieceType.PAWN, PieceColor.WHITE);
					colIndex++;
				} else if(rows[i].charAt(j) == 'R') {
					this.squares[colIndex][7-i] = new Piece(PieceType.ROOK, PieceColor.WHITE); 
					colIndex++;
				} else if (rows[i].charAt(j) == 'N') {
					this.squares[colIndex][7-i] = new Piece(PieceType.KNIGHT, PieceColor.WHITE); 
					colIndex++;
				}  else if (rows[i].charAt(j) == 'B') {
					this.squares[colIndex][7-i] = new Piece(PieceType.BISHOP, PieceColor.WHITE); 
					colIndex++;
				}  else if (rows[i].charAt(j) == 'Q') {
					this.squares[colIndex][7-i] = new Piece(PieceType.QUEEN, PieceColor.WHITE); 
					colIndex++;
				}  else if (rows[i].charAt(j) == 'K') {
					this.squares[colIndex][7-i] = new Piece(PieceType.KING, PieceColor.WHITE); 
					colIndex++;
				} else {
					colIndex += Integer.parseInt("" + rows[i].charAt(j));
				}
				
			}
		}
		
		if(elements[1].compareTo("b") == 0) {
			this.activeColor = PieceColor.BLACK;
		} else {
			this.activeColor = PieceColor.WHITE;
		}
		
		for(int i=0; i<elements[2].length(); i++) {
			
			if(elements[2].charAt(i) == 'K') {
				this.whiteKingsideCastling = true;
			} else if(elements[2].charAt(i) == 'Q') {
				this.whiteQueensideCastling = true;
			} else if(elements[2].charAt(i) == 'k') {
				this.blackKingsideCastling = true;
			} else if(elements[2].charAt(i) == 'q') {
				this.blackQueensideCastling = true;
			} 
			
		}
		
		
		if(elements[3].compareTo("-") != 0) {
			this.enPassant = true;
			this.enPassantTargetCol = (int)elements[3].charAt(0) - 97;
			this.enPassantTargetRow =  Integer.parseInt("" + elements[3].charAt(1));
		}
		
		
	}
	
	void makeMove(Move move) {
		Piece movedPiece = this.squares[move.beginCol][move.beginRow];
		this.squares[move.beginCol][move.beginRow] = null;
		move.takenPiece = this.squares[move.endCol][move.endRow];
		this.squares[move.endCol][move.endRow] = movedPiece;
	}
	
	void undoMove(Move move) {
		Piece movedPiece = this.squares[move.endCol][move.endRow];
		this.squares[move.endCol][move.endRow] = move.takenPiece;
		this.squares[move.beginCol][move.beginRow] = movedPiece;
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
	
	public void printBoardGraphic() {
		for(int i=7; i>=0; i--) {
			for(int j=0; j<=7; j++) {
				
				if(this.squares[j][i] == null) {
					System.out.print(". ");
				} else {
					this.squares[j][i].printPieceGraphic();
					System.out.print(" ");
				}
				
			}
			
			System.out.println("");
		}
		
		if(this.activeColor == PieceColor.WHITE) {
			System.out.println("Active color: WHITE");
		} else {
			System.out.println("Active color: BLACK");
		}
		
		
		
		if(this.whiteKingsideCastling) {
			System.out.println("Kingside castling for white king is avalible");
		}
		
		if(this.whiteQueensideCastling) {
			System.out.println("Queenside castling for white king is avalible");
		}
		
		if(this.blackKingsideCastling) {
			System.out.println("Kingside castling for black king is avalible");
		}
		
		if(this.blackQueensideCastling) {
			System.out.println("Queenside castling for black king is avalible");
		}
		
		
		if(this.enPassant) {
			System.out.println("no. of en passant target column: " + this.enPassantTargetCol);
			System.out.println("no. of en passant target row: " + (this.enPassantTargetRow - 1));
		}
		
		
	}

	
}
