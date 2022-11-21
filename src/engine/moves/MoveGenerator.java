package engine.moves;

import engine.board_and_pieces.Board;
import engine.board_and_pieces.PieceColor;
import engine.board_and_pieces.PieceType;
import engine.utils.MoveHandler;

import java.util.ArrayList;

public class MoveGenerator {
	
	public static Move[] getPossibleMoves(Board board) {
		ArrayList<Move> possibleMoves = new ArrayList<Move>();
		PieceColor color = board.activeColor;

		for (int i=0; i<=7; i++) {
			for (int j=0; j<=7; j++) {
				if (hasColor(board, i, j, color)) {
					if (board.squares[i][j].getType() == PieceType.ROOK) {
						addRookMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.KNIGHT) {
						addKnightMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.BISHOP) {
						addBishopMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.QUEEN) {
						addQueenMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.KING) {
						addKingMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.PAWN) {
						addPawnMoves(board, i, j, color, possibleMoves);
					}
				}
			}
		}
		
		//Tu przeglądamy wygenerowane ruchy i  odrzucamy te, które pozostawiają króla w szachu
		
		int kingCol = 0, kingRow = 0;
		//W tej liście będziemy przetrzymywać wszystkie ruchy, które mają zostać usunięte (bo pozostawiają króla w szachu)
		ArrayList<Move> improperMoves = new ArrayList<>();
		
		for (Move m : possibleMoves) {
			
			//1. Robimy ruch
			
			board = MoveHandler.makeMove(board, m);

			//2. Znajdujemy króla na szachownicy po wykoaniu ruchu
			for (int i=0; i<=7; i++) {
				for (int j=0; j<=7; j++) {
					if (!freeSquare(board, i, j) && board.squares[i][j].getColor() == color && board.squares[i][j].getType() == PieceType.KING) {
						kingCol = i;
						kingRow = j;
					}
				}
			}
			//3. Sprawdzamy, czy pole z królem jest atakowane przez bierki przeciwnego koloru (jeśli tak - cofamy ruch)
			if (isSquareAttacked(board, opponentColor(color), kingCol, kingRow)) {
				improperMoves.add(m);
			}
			//4. Cofamy ruch wykonany w punkcie 1
			board = MoveHandler.undoMove(board, m);

		}
		
		possibleMoves.removeAll(improperMoves);
		
		Move arr[] = new Move[possibleMoves.size()];
		return possibleMoves.toArray(arr);
	}
	
	/**
	 * Generates all possible moves, even if the king is checked by opponent's pieces afterward.
	 */
	
	public static Move[] getPseudoLegalMoves(Board board) {
		ArrayList<Move> possibleMoves = new ArrayList<Move>();
		PieceColor color = board.activeColor;

		for (int i=0; i<=7; i++) {
			for (int j=0; j<=7; j++) {
				if (hasColor(board, i, j, color)) {
					if (board.squares[i][j].getType() == PieceType.ROOK) {
						addRookMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.KNIGHT) {
						addKnightMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.BISHOP) {
						addBishopMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.QUEEN) {
						addQueenMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.KING) {
						addKingMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.PAWN) {
						addPawnMoves(board, i, j, color, possibleMoves);
					}
				}
			}
		}
		
		Move arr[] = new Move[possibleMoves.size()];
		return possibleMoves.toArray(arr);
	}
	
	
	public static Move[] getAttackingMoves(Board board, PieceColor color) {
		ArrayList<Move> possibleMoves = new ArrayList<Move>();
		
		for (int i=0; i<=7; i++) {
			for (int j=0; j<=7; j++) {
				if (hasColor(board, i, j, color)) {
					if (board.squares[i][j].getType() == PieceType.ROOK) {
						addRookMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.KNIGHT) {
						addKnightMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.BISHOP) {
						addBishopMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.QUEEN) {
						addQueenMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.KING) {
						addKingAttackingMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.PAWN) {
						addPawnAttackingMoves(i, j, color, possibleMoves);
					}
				}
			}
		}

		Move arr[] = new Move[possibleMoves.size()];
		return possibleMoves.toArray(arr);
	}
	
	/**
	 * Generates all possible moves that involve capturing opponent's pieces.
	 */
	public static Move[] getCaptureMoves(Board board) {
		ArrayList<Move> possibleMoves = new ArrayList<Move>();
		PieceColor color = board.activeColor;
		
		for (int i=0; i<=7; i++) {
			for (int j=0; j<=7; j++) {
				if (hasColor(board, i, j, color)) {
					if (board.squares[i][j].getType() == PieceType.ROOK) {
						addRookCaptureMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.KNIGHT) {
						addKnightCaptureMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.BISHOP) {
						addBishopCaptureMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.QUEEN) {
						addQueenCaptureMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.KING) {
						addKingCaptureMoves(board, i, j, color, possibleMoves);
					} else if (board.squares[i][j].getType() == PieceType.PAWN) {
						addPawnCaptureMoves(board, i, j, color, possibleMoves);
					}
				}
			}
		}

		Move arr[] = new Move[possibleMoves.size()];
		return possibleMoves.toArray(arr);
	}
	
	
	//Metoda sprawdza, czy przy obecnym ustawieniu szachownicy dane pole jest atakowane przez bierki danego koloru
	private static boolean isSquareAttacked(Board board, PieceColor color,  int col, int row) {
		Move[] attackingMoves = getAttackingMoves(board, color);
		
		for (Move m : attackingMoves) {
			if (m.endCol == col && m.endRow == row) {
				return true;
			}
		}
		return false;
	}
	
	private static PieceColor opponentColor(PieceColor color) {
		if (color == PieceColor.BLACK) {
			return PieceColor.WHITE;
		} else {
			return PieceColor.BLACK;
		}
	}
	
	private static boolean onChessboard(int col, int row) {
		return (col >= 0 && col <= 7 && row >= 0 && row <= 7);
	}
	
	private static boolean freeSquare(Board board, int col, int row) {
		return (board.squares[col][row] == null);
	}
	
	private static boolean hasColor(Board board, int col, int row, PieceColor color) {
		if (board.squares[col][row] == null) {
			return false;
		} else {
			return (board.squares[col][row].getColor() == color);
		}
	}
	
	private static boolean freeOrColor(Board board, int col, int row, PieceColor color) {
		if (board.squares[col][row] == null) {
			return true;
		} else if (board.squares[col][row].getColor() == color) {
			return true;
		} {
			return false;
		}
	}
	
	private static void addRookMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
			
		int i = 1;
		while (onChessboard((beginCol + i), beginRow) && freeSquare(board, (beginCol + i), beginRow)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + i), beginRow));
			i++;
		}
		
		if (onChessboard((beginCol + i), beginRow)) {
			if (board.squares[(beginCol + i)][beginRow].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol + i), beginRow));
			}
		}
			
		i = 1;
		while (onChessboard((beginCol - i), beginRow) && freeSquare(board, (beginCol - i), beginRow)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - i), beginRow));
			i++;
		}
		if (onChessboard((beginCol - i), beginRow)) {
			if (board.squares[(beginCol - i)][beginRow].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol - i), beginRow));
			}
		}
			
		i = 1;
		while (onChessboard(beginCol, (beginRow + i)) && freeSquare(board, beginCol, (beginRow + i))) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow + i)));
			i++;
		}
		if (onChessboard(beginCol, (beginRow + i))) {
			if (board.squares[beginCol][(beginRow + i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow + i)));
			}
		}
			
		i = 1;
		while (onChessboard(beginCol, (beginRow - i)) && freeSquare(board, beginCol, (beginRow - i))) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow - i)));
			i++;
		}
		if (onChessboard(beginCol, (beginRow - i))) {
			if (board.squares[beginCol][(beginRow - i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow - i)));
			}
		}
	}

	private static void addBishopMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
			
		int i = 1;
		while (onChessboard((beginCol + i), (beginRow + i)) && freeSquare(board, (beginCol + i), (beginRow + i))) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + i), (beginRow + i)));
			i++;
		}
		if (onChessboard((beginCol + i), (beginRow + i))) {
			if (board.squares[(beginCol + i)][(beginRow + i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol + i), (beginRow + i)));
			}
		}
			
		i = 1;
		while (onChessboard((beginCol - i), (beginRow + i)) && freeSquare(board, (beginCol - i), (beginRow + i))) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - i), (beginRow + i)));
			i++;
		}
		if (onChessboard((beginCol - i), (beginRow + i))) {
			if (board.squares[(beginCol - i)][(beginRow + i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol - i), (beginRow + i)));
			}
		}
			
		i = 1;
		while (onChessboard((beginCol + i), (beginRow - i)) && freeSquare(board, (beginCol + i), (beginRow - i))) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + i), (beginRow - i)));
			i++;
		}
		if (onChessboard((beginCol + i), (beginRow - i))) {
			if (board.squares[(beginCol + i)][(beginRow - i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol + i), (beginRow - i)));
			}
		}
			
		i = 1;
		while (onChessboard((beginCol - i), (beginRow - i)) && freeSquare(board, (beginCol - i), (beginRow - i))) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - i), (beginRow - i)));
			i++;
		}
		if (onChessboard((beginCol - i), (beginRow - i))) {
			if (board.squares[(beginCol - i)][(beginRow - i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol - i), (beginRow - i)));
			}
		}
	}

	private static void addQueenMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		addRookMoves(board, beginCol, beginRow, myColor, possibleMoves);
		addBishopMoves(board, beginCol, beginRow, myColor, possibleMoves);
	}
	
	private static void addKnightMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
		
		if (onChessboard((beginCol + 2), (beginRow + 1)) && freeOrColor(board, (beginCol + 2), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 2), (beginRow + 1)));
		}
		if (onChessboard((beginCol + 2), (beginRow - 1)) && freeOrColor(board, (beginCol + 2), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 2), (beginRow - 1)));
		}
		if (onChessboard((beginCol - 2), (beginRow + 1)) && freeOrColor(board, (beginCol - 2), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 2), (beginRow + 1)));
		}
		if (onChessboard((beginCol - 2), (beginRow - 1)) && freeOrColor(board, (beginCol - 2), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 2), (beginRow - 1)));
		}
		if (onChessboard((beginCol + 1), (beginRow + 2)) && freeOrColor(board, (beginCol + 1), (beginRow + 2), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow + 2)));
		}
		if (onChessboard((beginCol + 1), (beginRow - 2)) && freeOrColor(board, (beginCol + 1), (beginRow - 2), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow - 2)));
		}
		if (onChessboard((beginCol - 1), (beginRow + 2)) && freeOrColor(board, (beginCol - 1), (beginRow + 2), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow + 2)));
		}
		if (onChessboard((beginCol - 1), (beginRow - 2)) && freeOrColor(board, (beginCol - 1), (beginRow - 2), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow - 2)));
		}
	}
	
	private static void addPawnMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
		
		if (myColor == PieceColor.WHITE) {
			if (onChessboard(beginCol, (beginRow + 1)) && freeSquare(board, beginCol, (beginRow + 1))) {
				if ((beginRow + 1) == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, (beginRow + 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, (beginRow + 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, (beginRow + 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, (beginRow + 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow + 1)));
				}	
			}
			if (beginRow == 1 && onChessboard(beginCol, (beginRow + 2)) && freeSquare(board, beginCol, (beginRow + 2)) && freeSquare(board, beginCol, (beginRow + 1))) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow + 2)));
			}
			if (onChessboard((beginCol + 1), (beginRow + 1)) && !freeSquare(board, (beginCol + 1), (beginRow + 1)) && board.squares[(beginCol + 1)][(beginRow + 1)].getColor() == oppColor) {
				if ((beginRow + 1) == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow + 1)));
				}	
			}
			if (onChessboard((beginCol - 1), (beginRow + 1)) && !freeSquare(board, (beginCol - 1), (beginRow + 1)) && board.squares[(beginCol - 1)][(beginRow + 1)].getColor() == oppColor) {
				if ((beginRow + 1) == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow + 1)));
				}
			}
			//Dwa ostatnie rozpatrywane ruchy obejmują bicie en passant
			if (board.getEnPassant() && beginRow == 4 && board.getEnPassantTargetCol() == beginCol + 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1)));
			}
			if (board.getEnPassant() && beginRow == 4 && board.getEnPassantTargetCol() == beginCol - 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1)));
			}
		} 
		else {
			if (onChessboard(beginCol, (beginRow - 1)) && freeSquare(board, beginCol, (beginRow - 1))) {
				if ((beginRow - 1) == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, (beginRow - 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, (beginRow - 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, (beginRow - 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, beginCol, (beginRow - 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow - 1)));
				}	
			}
			if (beginRow == 6 && onChessboard(beginCol, (beginRow - 2)) && freeSquare(board, beginCol, (beginRow - 2)) && freeSquare(board, beginCol, (beginRow - 1))) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow - 2)));
			}
			if (onChessboard((beginCol + 1), (beginRow - 1)) && !freeSquare(board, (beginCol + 1), (beginRow - 1)) && board.squares[(beginCol + 1)][(beginRow - 1)].getColor() == oppColor) {
				if ((beginRow - 1) == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow - 1)));
				}
			}
			if (onChessboard((beginCol - 1), (beginRow - 1)) && !freeSquare(board, (beginCol - 1), (beginRow - 1)) && board.squares[(beginCol - 1)][(beginRow - 1)].getColor() == oppColor) {
				if ((beginRow - 1) == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow - 1)));
				}
			}
			//Dwa ostatnie rozpatrywane ruchy obejmują bicie en passant
			if (board.getEnPassant() && beginRow == 3 && board.getEnPassantTargetCol() == beginCol + 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1)));
			}
			if (board.getEnPassant() && beginRow == 3 && board.getEnPassantTargetCol() == beginCol - 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1)));
			}
		}
	}
	
	private static void addPawnAttackingMoves(int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
		
		if (myColor == PieceColor.WHITE) {
			if (onChessboard((beginCol + 1), (beginRow + 1))) {
				if ((beginRow + 1) == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow + 1)));
				}	
			}
			if (onChessboard((beginCol - 1), (beginRow + 1))) {
				if ((beginRow + 1) == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow + 1)));
				}
			}
		} 
		else {
			if (onChessboard((beginCol + 1), (beginRow - 1))) {
				if (beginRow - 1 == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow - 1)));
				}
			}
			if (onChessboard((beginCol - 1), (beginRow - 1))) {
				if (beginRow - 1 == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow - 1)));
				}
			}
		}
	}
	
	private static void addKingMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
		
		if (onChessboard(beginCol, (beginRow + 1)) && freeOrColor(board, beginCol, (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow + 1)));
		}
		if (onChessboard(beginCol, (beginRow - 1)) && freeOrColor(board, beginCol, (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow - 1)));
		}
		if (onChessboard((beginCol + 1), beginRow) && freeOrColor(board, (beginCol + 1), beginRow, oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), beginRow));
		}
		if (onChessboard((beginCol - 1), beginRow) && freeOrColor(board, (beginCol - 1), beginRow, oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), beginRow));
		}
		if (onChessboard((beginCol + 1), (beginRow + 1)) && freeOrColor(board, (beginCol + 1), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow + 1)));
		}
		if (onChessboard((beginCol + 1), (beginRow - 1)) && freeOrColor(board, (beginCol + 1), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow - 1)));
		}
		if (onChessboard((beginCol - 1), (beginRow + 1)) && freeOrColor(board, (beginCol - 1), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow + 1)));
		}
		if (onChessboard((beginCol - 1), (beginRow - 1)) && freeOrColor(board, (beginCol - 1), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow - 1)));
		}
		
		//Rozpatrujemy dostępne roszady
		if (myColor == PieceColor.WHITE) {
			if (board.isWhiteKingsideCastling() && board.squares[7][0].getColor() == PieceColor.WHITE && board.squares[7][0].getType() == PieceType.ROOK && freeSquare(board, 5, 0) && freeSquare(board, 6, 0)) {
				if (!isSquareAttacked(board, PieceColor.BLACK, 4, 0) && !isSquareAttacked(board, PieceColor.BLACK, 5, 0) && !isSquareAttacked(board, PieceColor.BLACK, 6, 0)) {
					possibleMoves.add(new CastlingMove(4, 0, 6, 0));
				}
			}
			
			if (board.isWhiteQueensideCastling() && board.squares[0][0].getColor() == PieceColor.WHITE && board.squares[0][0].getType() == PieceType.ROOK  && freeSquare(board, 1, 0) && freeSquare(board, 2, 0) && freeSquare(board, 3, 0)) {
				if (!isSquareAttacked(board, PieceColor.BLACK, 4, 0) &&  !isSquareAttacked(board, PieceColor.BLACK, 2, 0) && !isSquareAttacked(board, PieceColor.BLACK, 3, 0)) {
					possibleMoves.add(new CastlingMove(4, 0, 2, 0));
				}
			}
			
		} 
		else if (myColor == PieceColor.BLACK) {
			if (board.isBlackKingsideCastling() && board.squares[7][7].getColor() == PieceColor.BLACK && board.squares[7][7].getType() == PieceType.ROOK && freeSquare(board, 5, 7) && freeSquare(board, 6, 7)) {
				if (!isSquareAttacked(board, PieceColor.WHITE, 4, 7) && !isSquareAttacked(board, PieceColor.WHITE, 5, 7) && !isSquareAttacked(board, PieceColor.WHITE, 6, 7)) {
					possibleMoves.add(new CastlingMove(4, 7, 6, 7));
				}	
			}
			
			if (board.isBlackQueensideCastling() && board.squares[0][7].getColor() == PieceColor.BLACK && board.squares[0][7].getType() == PieceType.ROOK && freeSquare(board, 1, 7) && freeSquare(board, 2, 7) && freeSquare(board, 3, 7)) {
				if (!isSquareAttacked(board, PieceColor.WHITE, 4, 7) &&  !isSquareAttacked(board, PieceColor.WHITE, 2, 7) && !isSquareAttacked(board, PieceColor.WHITE, 3, 7)) {
					possibleMoves.add(new CastlingMove(4, 7, 2, 7));
				}
			}
		}
	}
	
	private static void addKingAttackingMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
		
		if (onChessboard(beginCol, (beginRow + 1)) && freeOrColor(board, beginCol, (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow + 1)));
		}
		if (onChessboard(beginCol, (beginRow - 1)) && freeOrColor(board, beginCol, (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow - 1)));
		}
		if (onChessboard((beginCol + 1), beginRow) && freeOrColor(board, (beginCol + 1), beginRow, oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), beginRow));
		}
		if (onChessboard((beginCol - 1), beginRow) && freeOrColor(board, (beginCol - 1), beginRow, oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), beginRow));
		}
		
		if (onChessboard((beginCol + 1), (beginRow + 1)) && freeOrColor(board, (beginCol + 1), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow + 1)));
		}
		if (onChessboard((beginCol + 1), (beginRow - 1)) && freeOrColor(board, (beginCol + 1), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow - 1)));
		}
		if (onChessboard((beginCol - 1), (beginRow + 1)) && freeOrColor(board, (beginCol - 1), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow + 1)));
		}
		if (onChessboard((beginCol - 1), (beginRow - 1)) && freeOrColor(board, (beginCol - 1), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow - 1)));
		}
	}
	
	private static void addRookCaptureMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
			
		int i = 1;
		while (onChessboard((beginCol + i), beginRow) && freeSquare(board, (beginCol + i), beginRow)) {
			i++;
		}
		
		if (onChessboard((beginCol + i), beginRow)) {
			if (board.squares[(beginCol + i)][beginRow].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol + i), beginRow));
			}
		}
			
		i = 1;
		while (onChessboard((beginCol - i), beginRow) && freeSquare(board, (beginCol - i), beginRow)) {
			i++;
		}
		if (onChessboard((beginCol - i), beginRow)) {
			if (board.squares[(beginCol - i)][beginRow].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol - i), beginRow));
			}
		}
			
		i = 1;
		while (onChessboard(beginCol, (beginRow + i)) && freeSquare(board, beginCol, (beginRow + i))) {
			i++;
		}
		if (onChessboard(beginCol, (beginRow + i))) {
			if (board.squares[beginCol][(beginRow + i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow + i)));
			}
		}
			
		i = 1;
		while (onChessboard(beginCol, (beginRow - i)) && freeSquare(board, beginCol, (beginRow - i))) {
			i++;
		}
		if (onChessboard(beginCol, (beginRow - i))) {
			if (board.squares[beginCol][(beginRow - i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow - i)));
			}
		}
	}	
	
	private static void addBishopCaptureMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
			
		int i = 1;
		while (onChessboard((beginCol + i), (beginRow + i)) && freeSquare(board, (beginCol + i), (beginRow + i))) {
			i++;
		}
		if (onChessboard((beginCol + i), (beginRow + i))) {
			if (board.squares[(beginCol + i)][(beginRow + i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol + i), (beginRow + i)));
			}
		}
			
		i = 1;
		while (onChessboard((beginCol - i), (beginRow + i)) && freeSquare(board, (beginCol - i), (beginRow + i))) {
			i++;
		}
		if (onChessboard((beginCol - i), (beginRow + i))) {
			if (board.squares[(beginCol - i)][(beginRow + i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol - i), (beginRow + i)));
			}
		}
			
		i = 1;
		while (onChessboard((beginCol + i), (beginRow - i)) && freeSquare(board, (beginCol + i), (beginRow - i))) {
			i++;
		}
		if (onChessboard((beginCol + i), (beginRow - i))) {
			if (board.squares[(beginCol + i)][(beginRow - i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol + i), (beginRow - i)));
			}
		}
			
		i = 1;
		while (onChessboard((beginCol - i), (beginRow - i)) && freeSquare(board, (beginCol - i), (beginRow - i))) {
			i++;
		}
		if (onChessboard((beginCol - i), (beginRow - i))) {
			if (board.squares[(beginCol - i)][(beginRow - i)].getColor() == oppColor) {
				possibleMoves.add(new Move(beginCol, beginRow, (beginCol - i), (beginRow - i)));
			}
		}
	}
	
	private static void addQueenCaptureMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		addRookCaptureMoves(board, beginCol, beginRow, myColor, possibleMoves);
		addBishopCaptureMoves(board, beginCol, beginRow, myColor, possibleMoves);
	}
	
	private static void addKnightCaptureMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
		
		if (onChessboard((beginCol + 2), (beginRow + 1)) && hasColor(board, (beginCol + 2), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 2), (beginRow + 1)));
		}
		if (onChessboard((beginCol + 2), (beginRow - 1)) && hasColor(board, (beginCol + 2), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 2), (beginRow - 1)));
		}
		if (onChessboard((beginCol - 2), (beginRow + 1)) && hasColor(board, (beginCol - 2), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 2), (beginRow + 1)));
		}
		if (onChessboard((beginCol - 2), (beginRow - 1)) && hasColor(board, (beginCol - 2), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 2), (beginRow - 1)));
		}
		if (onChessboard((beginCol + 1), (beginRow + 2)) && hasColor(board, (beginCol + 1), (beginRow + 2), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow + 2)));
		}
		if (onChessboard((beginCol + 1), (beginRow - 2)) && hasColor(board, (beginCol + 1), (beginRow - 2), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow - 2)));
		}
		if (onChessboard((beginCol - 1), (beginRow + 2)) && hasColor(board, (beginCol - 1), (beginRow + 2), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow + 2)));
		}
		if (onChessboard((beginCol - 1), (beginRow - 2)) && hasColor(board, (beginCol - 1), (beginRow - 2), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow - 2)));
		}
	}
	
	private static void addPawnCaptureMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
		
		if (myColor == PieceColor.WHITE) {
			if (onChessboard((beginCol + 1), (beginRow + 1)) && !freeSquare(board, (beginCol + 1), (beginRow + 1)) && board.squares[(beginCol + 1)][(beginRow + 1)].getColor() == oppColor) {
				if ((beginRow + 1) == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow + 1)));
				}	
			}
			if (onChessboard((beginCol - 1), (beginRow + 1)) && !freeSquare(board, (beginCol - 1), (beginRow + 1)) && board.squares[(beginCol - 1)][(beginRow + 1)].getColor() == oppColor) {
				if ((beginRow + 1) == 7) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow + 1)));
				}
			}
			//Dwa ostatnie rozpatrywane ruchy obejmują bicie en passant
			if (board.getEnPassant() && beginRow == 4 && board.getEnPassantTargetCol() == beginCol + 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, (beginCol + 1), (beginRow + 1)));
			}
			if (board.getEnPassant() && beginRow == 4 && board.getEnPassantTargetCol() == beginCol - 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, (beginCol - 1), (beginRow + 1)));
			}
		} 
		else {
			if (onChessboard((beginCol + 1), (beginRow - 1)) && !freeSquare(board, (beginCol + 1), (beginRow - 1)) && board.squares[(beginCol + 1)][(beginRow - 1)].getColor() == oppColor) {
				if ((beginRow - 1) == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow - 1)));
				}
			}
			if (onChessboard((beginCol - 1), (beginRow - 1)) && !freeSquare(board, (beginCol - 1), (beginRow - 1)) && board.squares[(beginCol - 1)][(beginRow - 1)].getColor() == oppColor) {
				if ((beginRow - 1) == 0) {
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.ROOK));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.KNIGHT));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.BISHOP));
					possibleMoves.add(new PromotionMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1), PieceType.QUEEN));
				} else {
					possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow - 1)));
				}
			}
			//Dwa ostatnie rozpatrywane ruchy obejmują bicie en passant
			if (board.getEnPassant() && beginRow == 3 && board.getEnPassantTargetCol() == beginCol + 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, (beginCol + 1), (beginRow - 1)));
			}
			if (board.getEnPassant() && beginRow == 3 && board.getEnPassantTargetCol() == beginCol - 1) {
				possibleMoves.add(new EnPassantMove(beginCol, beginRow, (beginCol - 1), (beginRow - 1)));
			}
		}
	}
	
	private static void addKingCaptureMoves(Board board, int beginCol, int beginRow, PieceColor myColor, ArrayList<Move> possibleMoves) {
		PieceColor oppColor = opponentColor(myColor);
		
		if (onChessboard(beginCol, (beginRow + 1)) && hasColor(board, beginCol, (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow + 1)));
		}
		if (onChessboard(beginCol, (beginRow - 1)) && hasColor(board, beginCol, (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, beginCol, (beginRow - 1)));
		}
		if (onChessboard((beginCol + 1), beginRow) && hasColor(board, (beginCol + 1), beginRow, oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), beginRow));
		}
		if (onChessboard((beginCol - 1), beginRow) && hasColor(board, (beginCol - 1), beginRow, oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), beginRow));
		}
		if (onChessboard((beginCol + 1), (beginRow + 1)) && hasColor(board, (beginCol + 1), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow + 1)));
		}
		if (onChessboard((beginCol + 1), (beginRow - 1)) && hasColor(board, (beginCol + 1), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol + 1), (beginRow - 1)));
		}
		if (onChessboard((beginCol - 1), (beginRow + 1)) && hasColor(board, (beginCol - 1), (beginRow + 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow + 1)));
		}
		if (onChessboard((beginCol - 1), (beginRow - 1)) && hasColor(board, (beginCol - 1), (beginRow - 1), oppColor)) {
			possibleMoves.add(new Move(beginCol, beginRow, (beginCol - 1), (beginRow - 1)));
		}
	}
	

}
