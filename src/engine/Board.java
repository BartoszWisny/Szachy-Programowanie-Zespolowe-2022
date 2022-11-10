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
			this.enPassantTargetRow =  Integer.parseInt("" + elements[3].charAt(1)) - 1;
		}
		
		
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
	
	
	void makeMove(Move move) {
		
		Piece movedPiece = this.squares[move.beginCol][move.beginRow];
		
		move.setSavedEnPassant(this.enPassant);
		move.setSavedEnPassantTargetCol(this.enPassantTargetCol);
		move.setSavedEnPassantTargetRow(this.enPassantTargetRow);
		move.setSavedWhiteKingsideCastling(this.whiteKingsideCastling);
		move.setSavedWhiteQueensideCastling(this.whiteQueensideCastling);
		move.setSavedBlackKingsideCastling(this.blackKingsideCastling);
		move.setSavedBlackQueensideCastling(this.blackQueensideCastling);
		
		if(move instanceof EnPassantMove) {
			
			//Piece movedPiece = this.squares[move.beginCol][move.beginRow];
			this.squares[move.beginCol][move.beginRow] = null;
			this.squares[move.endCol][move.endRow] = movedPiece;
			
			//Wykonujemy bicie en passant - zbijamy piona, który stoi w rzędzie początkowym, ale w kolumnie końcowej ruchu
			
			move.takenPiece = this.squares[move.endCol][move.beginRow];
			this.squares[move.endCol][move.beginRow] = null;
			
		} else if(move instanceof CastlingMove) {
			
			if(move.endCol == 2 && move.endRow == 0) {
				//Usuwamy wieżę z jej pola
				this.squares[0][0] = null;
				//Usuwamy króla z jego pola
				this.squares[4][0] = null;
				//Stawiamy wieżę na docelowym polu
				this.squares[3][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
				//Stawiamy króla na jego polu
				this.squares[2][0] = new Piece(PieceType.KING, PieceColor.WHITE);
				
			} else if(move.endCol == 6 && move.endRow == 0) {

				this.squares[7][0] = null;
				this.squares[4][0] = null;
				this.squares[5][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
				this.squares[6][0] = new Piece(PieceType.KING, PieceColor.WHITE);
				
			} else if(move.endCol == 2 && move.endRow == 7) {
				
				this.squares[0][7] = null;
				this.squares[4][7] = null;
				this.squares[3][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
				this.squares[2][7] = new Piece(PieceType.KING, PieceColor.BLACK);

				
			} else if(move.endCol == 6 && move.endRow == 7) {

				this.squares[7][7] = null;
				this.squares[4][7] = null;
				this.squares[5][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
				this.squares[6][7] = new Piece(PieceType.KING, PieceColor.BLACK);
				
			}
			
		} else {
			//Piece movedPiece = this.squares[move.beginCol][move.beginRow];
			this.squares[move.beginCol][move.beginRow] = null;
			move.takenPiece = this.squares[move.endCol][move.endRow];
			this.squares[move.endCol][move.endRow] = movedPiece;
		}
		
		//Ustawiamy konieczne flagi po ruchu
		
		//Gdy ruszaliśmy się z pól wież, ustawiamy odpowiednie flagi roszad (gdy był to pierwszy ruch tą wieżą, powoduje to zmianę, gdy był 
		//już koleny albo ruch inną figurą to nic nie zmienia)
		
		if(move.beginCol == 0 && move.beginRow == 0) {
			this.setWhiteQueensideCastling(false);
		} else if(move.beginCol == 7 && move.beginRow == 0) {
			this.setWhiteKingsideCastling(false);
		} else if(move.beginCol == 0 && move.beginRow == 7) {
			this.setBlackQueensideCastling(false);
		} else if(move.beginCol == 7 && move.beginRow == 7) {
			this.setBlackKingsideCastling(false);
		}
		
		//Po dowolnym ruchu królem danego koloru, ustawiamy obie flagi roszad na false (roszady nie będą już możliwe)
		
		if(movedPiece.getType() == PieceType.KING && movedPiece.getColor() == PieceColor.WHITE) {
			this.setWhiteKingsideCastling(false);
			this.setWhiteQueensideCastling(false);
		} else if(movedPiece.getType() == PieceType.KING && movedPiece.getColor() == PieceColor.BLACK) {
			this.setBlackKingsideCastling(false);
			this.setBlackQueensideCastling(false);		
		}
		
		//Jeśli ruszaną bierką był pionek i ruszał się o dwa pola, to ustawiamy flagę en passant na a true i 
		//wpisujemy odpowiednie pole
		
		if(movedPiece.getType() == PieceType.PAWN && movedPiece.getColor() == PieceColor.WHITE) {
			if(move.endRow - move.beginRow == 2) {
				this.setEnPassant(true);
				this.setEnPassantTargetCol(move.beginCol);
				this.setEnPassantTargetRow(move.beginRow+1);
				System.out.println("Rząd początkowy ruchu: " + move.beginRow);
			}
		} else if(movedPiece.getType() == PieceType.PAWN && movedPiece.getColor() == PieceColor.BLACK) {
			if(move.endRow - move.beginRow == -2) {
				this.setEnPassant(true);
				this.setEnPassantTargetCol(move.beginCol);
				this.setEnPassantTargetRow(move.beginRow-1);
			}
		} else {
			this.setEnPassant(false);
		}
		
		//Zmieniamy aktynego gracza na przeciwnego
		
		if(this.activeColor == PieceColor.WHITE) {
			this.activeColor = PieceColor.BLACK;
		} else {
			this.activeColor = PieceColor.WHITE;
		}
		
	}
	
	void undoMove(Move move) {
		
		this.setWhiteKingsideCastling(move.isSavedWhiteKingsideCastling());
		this.setWhiteQueensideCastling(move.isSavedWhiteQueensideCastling());
		this.setBlackKingsideCastling(move.isSavedBlackKingsideCastling());
		this.setBlackQueensideCastling(move.isSavedBlackQueensideCastling());
		this.setEnPassant(move.isSavedEnPassant());
		this.setEnPassantTargetCol(move.getSavedEnPassantTargetCol());
		this.setEnPassantTargetRow(move.getSavedEnPassantTargetRow());
		
		if(move instanceof EnPassantMove) {
			
			//Odstawiamy pionek, który zrobił ruch na pozycję początkową
			
			Piece movedPiece = this.squares[move.endCol][move.endRow];
			this.squares[move.endCol][move.endRow] = null;
			this.squares[move.beginCol][move.beginRow] = movedPiece;
			this.squares[move.endCol][move.beginRow] = move.takenPiece;
			

		} else if(move instanceof CastlingMove) {
			
			if(move.endCol == 2 && move.endRow == 0) {

				this.squares[0][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
				this.squares[4][0] = new Piece(PieceType.KING, PieceColor.WHITE);
				this.squares[3][0] = null;
				this.squares[2][0] = null;
				
			} else if(move.endCol == 6 && move.endRow == 0) {

				this.squares[7][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
				this.squares[4][0] = new Piece(PieceType.KING, PieceColor.WHITE);
				this.squares[5][0] = null;
				this.squares[6][0] = null;
				
			} else if(move.endCol == 2 && move.endRow == 7) {
				
				this.squares[0][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
				this.squares[4][7] = new Piece(PieceType.KING, PieceColor.BLACK);
				this.squares[3][7] = null;
				this.squares[2][7] = null;

				
			} else if(move.endCol == 6 && move.endRow == 7) {

				this.squares[7][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
				this.squares[4][7] = new Piece(PieceType.KING, PieceColor.BLACK);
				this.squares[5][7] = null;
				this.squares[6][7] = null;
				
			}
			
		} else {
			Piece movedPiece = this.squares[move.endCol][move.endRow];
			this.squares[move.endCol][move.endRow] = move.takenPiece;
			this.squares[move.beginCol][move.beginRow] = movedPiece;
		}

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
			System.out.println("no. of en passant target row: " + this.enPassantTargetRow);
		}
		
		
	}

	
}
