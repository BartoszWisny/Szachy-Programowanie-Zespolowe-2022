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
		
		Move arr[] = new Move[possibleMoves.size()];
		return possibleMoves.toArray(arr);
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
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow+1));
			}
			if( beginRow == 1 && onChessboard(beginCol, beginRow+2) && freeSquare(beginCol, beginRow+2) && freeSquare(beginCol, beginRow+1) ) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow+2));
			}
			if( onChessboard(beginCol+1, beginRow+1) && !freeSquare(beginCol+1, beginRow+1) && this.board.squares[beginCol+1][beginRow+1].getColor() == oppColor ) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow+1));
			}
			if( onChessboard(beginCol-1, beginRow+1) && !freeSquare(beginCol-1, beginRow+1) && this.board.squares[beginCol-1][beginRow+1].getColor() == oppColor ) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow+1));
			}
			//Dwa ostatnie rozpatrywane ruchy obejmują bicie en passant
			if( this.board.getEnPassant() && beginRow == 4 && this.board.getEnPassantTargetCol() == beginCol + 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, beginRow+1, beginCol+1));
			}
			if( this.board.getEnPassant() && beginRow == 4 && this.board.getEnPassantTargetCol() == beginCol - 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, beginRow+1, beginCol-1));
			}
			
			
		} else {
			
			if( onChessboard(beginCol, beginRow-1) && freeSquare(beginCol, beginRow-1) ) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow-1));
			}
			if( beginRow == 6 && onChessboard(beginCol, beginRow-2) && freeSquare(beginCol, beginRow-2) && freeSquare(beginCol, beginRow-1)) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, beginRow-2));
			}
			if( onChessboard(beginCol+1, beginRow-1) && !freeSquare(beginCol+1, beginRow-1) && this.board.squares[beginCol+1][beginRow+1].getColor() == oppColor ) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol+1, beginRow-1));
			}
			if( onChessboard(beginCol-1, beginRow-1) && !freeSquare(beginCol-1, beginRow-1) && this.board.squares[beginCol-1][beginRow+1].getColor() == oppColor ) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol-1, beginRow-1));
			}
			//Dwa ostatnie rozpatrywane ruchy obejmują bicie en passant
			if( this.board.getEnPassant() && beginRow == 3 && this.board.getEnPassantTargetCol() == beginCol + 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, beginRow-1, beginCol+1));
			}
			if( this.board.getEnPassant() && beginRow == 3 && this.board.getEnPassantTargetCol() == beginCol - 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, beginRow-1, beginCol-1));
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


		
	}

	
}
