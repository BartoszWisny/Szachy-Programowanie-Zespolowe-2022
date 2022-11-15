package engine;

import java.util.ArrayList;

public class MoveGenerator {

	Board board;
	
	public MoveGenerator(Board board) { 
		this.board = board;
	}
	
	public Move[] getPossibleMoves(PieceColor color) {
		
		ArrayList<Move> possibleMoves = new ArrayList<Move>();
		
		for(int i=0; i<=7; i++) {
			for(int j=0; j<=7; j++) {
				
				if(hasColor(i, j, color)) {
					
					if(this.board.squares[i][j].getType() == PieceType.ROOK) {
						addRookMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.KNIGHT) {
						addKnightMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.BISHOP) {
						addBishopMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.QUEEN) {
						addQueenMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.KING) {
						addKingMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.PAWN) {
						addPawnMoves(i, j, color, possibleMoves);
					} 
					
				}
				
			}
		}
		
		//Tu przeglądamy wygenerowane ruchy i  odrzucamy te, które pozostawiają króla w szachu
		
		int kingCol = 0, kingRow = 0;
		//W tej liście będziemy przetrzymywać wszystkie ruchy, które mają zostać usunięte (bo pozostawiają króla w szachu)
		ArrayList<Move> improperMoves = new ArrayList<Move>();
		
		for(Move m : possibleMoves) {
			
			//1. Robimy ruch
//			System.out.print("MOVE: ");
//			m.printMove();
//			System.out.println("\nBEFORE:");
//			board.printBoardGraphic();
			board.makeMove(m);
//			System.out.println("AFTER MAKE:");
//			board.printBoardGraphic();
			//2. Znajdujemy króla na szachownicy po wykoaniu ruchu
			for(int i=0; i<=7; i++) {
				for(int j=0; j<=7; j++) {
					if(!freeSquare(i, j) && board.squares[i][j].getColor() == color && board.squares[i][j].getType() == PieceType.KING) {
						kingCol = i;
						kingRow = j;
					}
				}
			}
			//3. Sprawdzamy, czy pole z królem jest atakowane przez bierki przeciwnego koloru (jeśli tak - cofamy ruch)
			if(isSquareAttacked(opponentColor(color), kingCol, kingRow)) {
				improperMoves.add(m);
			}
			//4. Cofamy ruch wykonany w punkcie 1
			board.undoMove(m);
//			System.out.println("AFTER UNDO:");
//			board.printBoardGraphic();
		}
		
		possibleMoves.removeAll(improperMoves);
		
		Move arr[] = new Move[possibleMoves.size()];
		return possibleMoves.toArray(arr);
	}
	
	public Move[] getAttackingMoves(PieceColor color) {
		
		ArrayList<Move> possibleMoves = new ArrayList<Move>();
		
		for(int i=0; i<=7; i++) {
			for(int j=0; j<=7; j++) {
				
				if(hasColor(i, j, color)) {
					
					if(this.board.squares[i][j].getType() == PieceType.ROOK) {
						addRookMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.KNIGHT) {
						addKnightMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.BISHOP) {
						addBishopMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.QUEEN) {
						addQueenMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.KING) {
						addKingAttackingMoves(i, j, color, possibleMoves);
					} else if(this.board.squares[i][j].getType() == PieceType.PAWN) {
						addPawnAttackingMoves(i, j, color, possibleMoves);
					} 
					
				}
				
			}
		}
				
		Move arr[] = new Move[possibleMoves.size()];
		return possibleMoves.toArray(arr);
	}
	
	//Metoda sprawdza, czy przy obecnym ustawieniu szachownicy dane pole jest atakowane przez bierki danego koloru 
	
	private boolean isSquareAttacked(PieceColor color,  int col, int row) {
		
		Move[] attackingMoves = getAttackingMoves(color);
		
		for(Move m : attackingMoves) {
			if(m.endCol == col && m.endRow == row) {
				return true;
			}
		}
		
		return false;
	}
	
	private PieceColor opponentColor(PieceColor color) {
		if(color == PieceColor.BLACK) {
			return PieceColor.WHITE;
		} else {
			return PieceColor.BLACK;
		}
	}
	
	private boolean onChessboard(int col, int row) {
		if(col >= 0 && col <= 7 && row >= 0 && row <= 7) {
			return true;
		} else {
			return false;
		}
	}
	
	private boolean freeSquare(int col, int row) {
		if(this.board.squares[col][row] == null) {
			return true;
		} else {
			return false;
		}
	}
	
	private boolean hasColor(int col, int row, PieceColor color) {
		if(this.board.squares[col][row] == null) {
			return false;
		} else if(this.board.squares[col][row].getColor() == color) {
			return true;
		} else {
			return false;
		}
	}
	
	private boolean freeOrColor(int col, int row, PieceColor color) {
		if(this.board.squares[col][row] == null) {
			return true;
		} else if (this.board.squares[col][row].getColor() == color) {
			return true;
		} {
			return false;
		}
	}
	
	private void addRookMoves(int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		
		PieceColor oppColor = opponentColor(myColor);
			
		int i = 1;
			
		while(onChessboard(beginCol+i, beginRow) && freeSquare(beginCol+i, beginRow)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+i, beginRow));
			i++;
		}
		if( onChessboard(beginCol+i, beginRow) ) {
			if( this.board.squares[beginCol+i][beginRow].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol+i, beginRow));
			}
		}
			
		i=1;
			
		while(onChessboard(beginCol-i, beginRow) && freeSquare(beginCol-i, beginRow)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-i, beginRow));
			i++;
		}
		if( onChessboard(beginCol-i, beginRow) ) {
			if( this.board.squares[beginCol-i][beginRow].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol-i, beginRow));
			}
		}
			
		i=1;
			
		while(onChessboard(beginCol, beginRow+i) && freeSquare(beginCol, beginRow+i)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow+i));
			i++;
		}
		if( onChessboard(beginCol, beginRow+i) ) {
			if( this.board.squares[beginCol][beginRow+i].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow+i));
			}
		}
			
		i=1;
			
		while(onChessboard(beginCol, beginRow-i) && freeSquare(beginCol, beginRow-i)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow-i));
			i++;
		}
		if( onChessboard(beginCol, beginRow-i) ) {
			if( this.board.squares[beginCol][beginRow-i].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow-i));
			}
		}
			
	}
	
	
	private void addBishopMoves(int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		
		PieceColor oppColor = opponentColor(myColor);
			
		int i = 1;
			
		while(onChessboard(beginCol+i, beginRow+i) && freeSquare(beginCol+i, beginRow+i)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+i, beginRow+i));
			i++;
		}
		if( onChessboard(beginCol+i, beginRow+i) ) {
			if( this.board.squares[beginCol+i][beginRow+i].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol+i, beginRow+i));
			}
		}
			
		i=1;
			
		while(onChessboard(beginCol-i, beginRow+i) && freeSquare(beginCol-i, beginRow+i)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-i, beginRow+i));
			i++;
		}
		if( onChessboard(beginCol-i, beginRow+i) ) {
			if( this.board.squares[beginCol-i][beginRow+i].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol-i, beginRow+i));
			}
		}
			
		i=1;
			
		while(onChessboard(beginCol+i, beginRow-i) && freeSquare(beginCol+i, beginRow-i)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+i, beginRow-i));
			i++;
		}
		if( onChessboard(beginCol+i, beginRow-i) ) {
			if( this.board.squares[beginCol+i][beginRow-i].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol+i, beginRow-i));
			}
		}
			
		i=1;
			
		while(onChessboard(beginCol-i, beginRow-i) && freeSquare(beginCol-i, beginRow-i)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-i, beginRow-i));
			i++;
		}
		if( onChessboard(beginCol-i, beginRow-i) ) {
			if( this.board.squares[beginCol-i][beginRow-i].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol-i, beginRow-i));
			}
		}
			
	}
	
	
	private void addQueenMoves(int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		addRookMoves(beginCol, beginRow, myColor, possibleMoves);
		addBishopMoves(beginCol, beginRow, myColor, possibleMoves);
	}
	
	private void addKnightMoves(int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		
		PieceColor oppColor = opponentColor(myColor);
		
		if( onChessboard(beginCol+2, beginRow+1) && freeOrColor(beginCol+2, beginRow+1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+2, beginRow+1));
		}
		if( onChessboard(beginCol+2, beginRow-1) && freeOrColor(beginCol+2, beginRow-1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+2, beginRow-1));
		}
		if( onChessboard(beginCol-2, beginRow+1) && freeOrColor(beginCol-2, beginRow+1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-2, beginRow+1));
		}
		if( onChessboard(beginCol-2, beginRow-1) && freeOrColor(beginCol-2, beginRow-1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-2, beginRow-1));
		}
		
		if( onChessboard(beginCol+1, beginRow+2) && freeOrColor(beginCol+1, beginRow+2, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow+2));
		}
		if( onChessboard(beginCol+1, beginRow-2) && freeOrColor(beginCol+1, beginRow-2, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow-2));
		}
		if( onChessboard(beginCol-1, beginRow+2) && freeOrColor(beginCol-1, beginRow+2, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow+2));
		}
		if( onChessboard(beginCol-1, beginRow-2) && freeOrColor(beginCol-1, beginRow-2, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow-2));
		}
		
		
	}
	
	private void addPawnMoves(int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		
		PieceColor oppColor = opponentColor(myColor);
		
		if(myColor == PieceColor.WHITE) {
			
			if( onChessboard(beginCol, beginRow+1) && freeSquare(beginCol, beginRow+1) ) {
				if(beginRow+1 == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, beginRow+1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, beginRow+1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, beginRow+1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, beginRow+1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow+1));
				}	
			}
			if( beginRow == 1 && onChessboard(beginCol, beginRow+2) && freeSquare(beginCol, beginRow+2) && freeSquare(beginCol, beginRow+1) ) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow+2));
			}
			if( onChessboard(beginCol+1, beginRow+1) && !freeSquare(beginCol+1, beginRow+1) && this.board.squares[beginCol+1][beginRow+1].getColor() == oppColor ) {
				
				if(beginRow+1 == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow+1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow+1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow+1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow+1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow+1));
				}	
			}
			if( onChessboard(beginCol-1, beginRow+1) && !freeSquare(beginCol-1, beginRow+1) && this.board.squares[beginCol-1][beginRow+1].getColor() == oppColor ) {
				if(beginRow+1 == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow+1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow+1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow+1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow+1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow+1));
				}
			}
			//Dwa ostatnie rozpatrywane ruchy obejmują bicie en passant
			if( this.board.getEnPassant() && beginRow == 4 && this.board.getEnPassantTargetCol() == beginCol + 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, beginCol+1, beginRow+1));
			}
			if( this.board.getEnPassant() && beginRow == 4 && this.board.getEnPassantTargetCol() == beginCol - 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, beginCol-1, beginRow+1));
			}
			
			
		} else {
			
			if( onChessboard(beginCol, beginRow-1) && freeSquare(beginCol, beginRow-1) ) {
				if(beginRow-1 == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, beginRow-1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, beginRow-1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, beginRow-1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, beginRow-1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow-1));
				}	
			}
			if( beginRow == 6 && onChessboard(beginCol, beginRow-2) && freeSquare(beginCol, beginRow-2) && freeSquare(beginCol, beginRow-1)) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow-2));
			}
			if( onChessboard(beginCol+1, beginRow-1) && !freeSquare(beginCol+1, beginRow-1) && this.board.squares[beginCol+1][beginRow-1].getColor() == oppColor ) {
				if(beginRow-1 == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow-1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow-1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow-1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow-1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow-1));
				}
			}
			if( onChessboard(beginCol-1, beginRow-1) && !freeSquare(beginCol-1, beginRow-1) && this.board.squares[beginCol-1][beginRow-1].getColor() == oppColor ) {
				if(beginRow-1 == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow-1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow-1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow-1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow-1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow-1));
				}
			}
			//Dwa ostatnie rozpatrywane ruchy obejmują bicie en passant
			if( this.board.getEnPassant() && beginRow == 3 && this.board.getEnPassantTargetCol() == beginCol + 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, beginCol+1, beginRow-1));
			}
			if( this.board.getEnPassant() && beginRow == 3 && this.board.getEnPassantTargetCol() == beginCol - 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, beginCol-1, beginRow-1));
			}
			
		}
		
	}
	
	private void addPawnAttackingMoves(int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		
		PieceColor oppColor = opponentColor(myColor);
		
		if(myColor == PieceColor.WHITE) {
			
			if( onChessboard(beginCol+1, beginRow+1)) {
				
				if(beginRow+1 == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow+1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow+1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow+1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow+1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow+1));
				}	
			}
			if( onChessboard(beginCol-1, beginRow+1)) {
				if(beginRow+1 == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow+1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow+1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow+1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow+1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow+1));
				}
			}			
			
		} else {
			
			if( onChessboard(beginCol+1, beginRow-1)) {
				if(beginRow-1 == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow-1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow-1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow-1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol+1, beginRow-1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow-1));
				}
			}
			if( onChessboard(beginCol-1, beginRow-1)) {
				if(beginRow-1 == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow-1, PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow-1, PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow-1, PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol-1, beginRow-1, PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow-1));
				}
			}
			
		}
		
	}
	
	private void addKingMoves(int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
	
		PieceColor oppColor = opponentColor(myColor);
		
		if( onChessboard(beginCol, beginRow+1) && freeOrColor(beginCol, beginRow+1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow+1));
		}
		if( onChessboard(beginCol, beginRow-1) && freeOrColor(beginCol, beginRow-1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow-1));
		}
		if( onChessboard(beginCol+1, beginRow) && freeOrColor(beginCol+1, beginRow, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow));
		}
		if( onChessboard(beginCol-1, beginRow) && freeOrColor(beginCol-1, beginRow, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow));
		}
		
		if( onChessboard(beginCol+1, beginRow+1) && freeOrColor(beginCol+1, beginRow+1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow+1));
		}
		if( onChessboard(beginCol+1, beginRow-1) && freeOrColor(beginCol+1, beginRow-1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow-1));
		}
		if( onChessboard(beginCol-1, beginRow+1) && freeOrColor(beginCol-1, beginRow+1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow+1));
		}
		if( onChessboard(beginCol-1, beginRow-1) && freeOrColor(beginCol-1, beginRow-1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow-1));
		}
		
		//Rozpatrujemy dostępne roszady
		
		if(myColor == PieceColor.WHITE) {
			
			if(board.isWhiteKingsideCastling() && board.squares[7][0].getColor() == PieceColor.WHITE && board.squares[7][0].getType() == PieceType.ROOK && freeSquare(5, 0) && freeSquare(6, 0) ) {
				if(!isSquareAttacked(PieceColor.BLACK, 4, 0) && !isSquareAttacked(PieceColor.BLACK, 5, 0) && !isSquareAttacked(PieceColor.BLACK, 6, 0)) {
					possibleMoves.add(new CastlingMove(4, 0, 6, 0));
				}
			}
			
			if(board.isWhiteQueensideCastling() && board.squares[0][0].getColor() == PieceColor.WHITE && board.squares[0][0].getType() == PieceType.ROOK  && freeSquare(1, 0) && freeSquare(2, 0) && freeSquare(3, 0)) {
				if(!isSquareAttacked(PieceColor.BLACK, 4, 0) &&  !isSquareAttacked(PieceColor.BLACK, 2, 0) && !isSquareAttacked(PieceColor.BLACK, 3, 0)) {
					possibleMoves.add(new CastlingMove(4, 0, 2, 0));
				}
			}
			
		} else if(myColor == PieceColor.BLACK) {
			
			if(board.isBlackKingsideCastling() && board.squares[7][7].getColor() == PieceColor.BLACK && board.squares[7][7].getType() == PieceType.ROOK && freeSquare(5, 7) && freeSquare(6, 7)) {
				if(!isSquareAttacked(PieceColor.WHITE, 4, 7) && !isSquareAttacked(PieceColor.WHITE, 5, 7) && !isSquareAttacked(PieceColor.WHITE, 6, 7)) {
					possibleMoves.add(new CastlingMove(4, 7, 6, 7));
				}	
			}
			
			if(board.isBlackQueensideCastling() && board.squares[0][7].getColor() == PieceColor.BLACK && board.squares[0][7].getType() == PieceType.ROOK && freeSquare(1, 7) && freeSquare(2, 7) && freeSquare(3, 7) ) {
				if(!isSquareAttacked(PieceColor.WHITE, 4, 7) &&  !isSquareAttacked(PieceColor.WHITE, 2, 7) && !isSquareAttacked(PieceColor.WHITE, 3, 7)) {
					possibleMoves.add(new CastlingMove(4, 7, 2, 7));
				}
			}
			
		}
	
	}
	
	private void addKingAttackingMoves(int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		
		PieceColor oppColor = opponentColor(myColor);
		
		if( onChessboard(beginCol, beginRow+1) && freeOrColor(beginCol, beginRow+1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow+1));
		}
		if( onChessboard(beginCol, beginRow-1) && freeOrColor(beginCol, beginRow-1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow-1));
		}
		if( onChessboard(beginCol+1, beginRow) && freeOrColor(beginCol+1, beginRow, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow));
		}
		if( onChessboard(beginCol-1, beginRow) && freeOrColor(beginCol-1, beginRow, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow));
		}
		
		if( onChessboard(beginCol+1, beginRow+1) && freeOrColor(beginCol+1, beginRow+1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow+1));
		}
		if( onChessboard(beginCol+1, beginRow-1) && freeOrColor(beginCol+1, beginRow-1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow-1));
		}
		if( onChessboard(beginCol-1, beginRow+1) && freeOrColor(beginCol-1, beginRow+1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow+1));
		}
		if( onChessboard(beginCol-1, beginRow-1) && freeOrColor(beginCol-1, beginRow-1, oppColor) ) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow-1));
		}
		
		
	}

	
}
