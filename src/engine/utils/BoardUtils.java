package engine.utils;

import engine.board_and_pieces.Board;
import engine.board_and_pieces.Piece;
import engine.board_and_pieces.PieceColor;
import engine.board_and_pieces.PieceType;
import engine.eval_function.ConstValues;


public class BoardUtils {

    public static Board createFromFEN(String FEN) {
        Board board = new Board();

        String[] elements = FEN.split(" ");
        String[] rows = elements[0].split("/");

        int colIndex;
        for (int i = 0; i <= 7; i++) {
            colIndex = 0;

            for (int j = 0; j < rows[i].length(); j++) {
                if (rows[i].charAt(j) == 'p') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.PAWN, PieceColor.BLACK);
                    colIndex++;
                } else if (rows[i].charAt(j) == 'r') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.ROOK, PieceColor.BLACK);
                    colIndex++;
                } else if (rows[i].charAt(j) == 'n') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.KNIGHT, PieceColor.BLACK);
                    colIndex++;
                }  else if (rows[i].charAt(j) == 'b') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.BISHOP, PieceColor.BLACK);
                    colIndex++;
                }  else if (rows[i].charAt(j) == 'q') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.QUEEN, PieceColor.BLACK);
                    colIndex++;
                }  else if (rows[i].charAt(j) == 'k') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.KING, PieceColor.BLACK);
                    colIndex++;
                } else if (rows[i].charAt(j) == 'P') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.PAWN, PieceColor.WHITE);
                    colIndex++;
                } else if (rows[i].charAt(j) == 'R') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.ROOK, PieceColor.WHITE);
                    colIndex++;
                } else if (rows[i].charAt(j) == 'N') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.KNIGHT, PieceColor.WHITE);
                    colIndex++;
                }  else if (rows[i].charAt(j) == 'B') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.BISHOP, PieceColor.WHITE);
                    colIndex++;
                }  else if (rows[i].charAt(j) == 'Q') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.QUEEN, PieceColor.WHITE);
                    colIndex++;
                }  else if (rows[i].charAt(j) == 'K') {
                    board.squares[colIndex][7-i] = new Piece(PieceType.KING, PieceColor.WHITE);
                    colIndex++;
                } else {
                    colIndex += Integer.parseInt("" + rows[i].charAt(j));
                }
            }
        }

        if (elements[1].compareTo("b") == 0) {
            board.activeColor = PieceColor.BLACK;
        } else {
            board.activeColor = PieceColor.WHITE;
        }

        for (int i=0; i<elements[2].length(); i++) {
            if (elements[2].charAt(i) == 'K') {
                board.setWhiteKingsideCastling(true);
            } else if(elements[2].charAt(i) == 'Q') {
                board.setWhiteQueensideCastling(true);
            } else if(elements[2].charAt(i) == 'k') {
                board.setBlackKingsideCastling(true);
            } else if(elements[2].charAt(i) == 'q') {
                board.setBlackQueensideCastling(true);
            }
        }

        if (elements[3].compareTo("-") != 0) {
            board.setEnPassant(true);
            board.setEnPassantTargetCol((int) elements[3].charAt(0) - 97);
            board.setEnPassantTargetRow(Integer.parseInt("" + elements[3].charAt(1)) - 1);
        }

        return board;
    }


    public static void boardSetup(Board board) {
        for (int i = 0; i <= (ConstValues.BOARD_COLS - 1); i++) {
            board.squares[i][1] = new Piece(PieceType.PAWN, PieceColor.WHITE);
            board.squares[i][6] = new Piece(PieceType.PAWN, PieceColor.BLACK);
        }

        board.squares[0][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
        board.squares[1][0] = new Piece(PieceType.KNIGHT, PieceColor.WHITE);
        board.squares[2][0] = new Piece(PieceType.BISHOP, PieceColor.WHITE);
        board.squares[3][0] = new Piece(PieceType.QUEEN, PieceColor.WHITE);
        board.squares[4][0] = new Piece(PieceType.KING, PieceColor.WHITE);
        board.squares[5][0] = new Piece(PieceType.BISHOP, PieceColor.WHITE);
        board.squares[6][0] = new Piece(PieceType.KNIGHT, PieceColor.WHITE);
        board.squares[7][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);

        board.squares[0][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
        board.squares[1][7] = new Piece(PieceType.KNIGHT, PieceColor.BLACK);
        board.squares[2][7] = new Piece(PieceType.BISHOP, PieceColor.BLACK);
        board.squares[3][7] = new Piece(PieceType.QUEEN, PieceColor.BLACK);
        board.squares[4][7] = new Piece(PieceType.KING, PieceColor.BLACK);
        board.squares[5][7] = new Piece(PieceType.BISHOP, PieceColor.BLACK);
        board.squares[6][7] = new Piece(PieceType.KNIGHT, PieceColor.BLACK);
        board.squares[7][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
    }

    
    public static void printBoard(Board board) {
        for (int i = (ConstValues.BOARD_ROWS - 1); i >= 0; i--) {
            for(int j = 0; j <= (ConstValues.BOARD_COLS - 1); j++) {
                if (board.squares[j][i] == null) {
                    System.out.print("* ");
                } else {
                    board.squares[j][i].printPiece();
                    System.out.print(" ");
                }
            }
            System.out.println("");
        }
    }

    
    public static void printBoardGraphic(Board board) {
        for (int i = (ConstValues.BOARD_ROWS - 1); i >= 0; i--) {
            for(int j = 0; j <= (ConstValues.BOARD_COLS - 1); j++) {
                if (board.squares[j][i] == null) {
                    System.out.print(". ");
                } else {
                    board.squares[j][i].printPieceGraphic();
                    System.out.print(" ");
                }
            }
            System.out.println("");
        }

		if (board.activeColor == PieceColor.WHITE) {
			System.out.println("Active color: WHITE");
		} else {
			System.out.println("Active color: BLACK");
		}
        
        if (board.isWhiteKingsideCastling()) {
            System.out.println("Kingside castling for white king is available");
        }

        if (board.isWhiteQueensideCastling()) {
            System.out.println("Queenside castling for white king is available");
        }

        if (board.isBlackKingsideCastling()) {
            System.out.println("Kingside castling for black king is available");
        }

        if (board.isBlackQueensideCastling()) {
            System.out.println("Queenside castling for black king is available");
        }
        
        if (board.getEnPassant()) {
            System.out.println("no. of en passant target column: " + board.getEnPassantTargetCol());
            System.out.println("no. of en passant target row: " + board.getEnPassantTargetRow());
        }
    }

}
