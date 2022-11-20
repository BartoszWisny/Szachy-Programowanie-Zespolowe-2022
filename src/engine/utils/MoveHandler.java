package engine.utils;

import engine.board_and_pieces.Board;
import engine.board_and_pieces.Piece;
import engine.board_and_pieces.PieceColor;
import engine.board_and_pieces.PieceType;
import engine.moves.CastlingMove;
import engine.moves.EnPassantMove;
import engine.moves.Move;
import engine.moves.PromotionMove;

public class MoveHandler {

    public static Board makeMove(Board currBoard, Move move) {
        Board updatedBoard = new Board(currBoard);
        Piece movedPiece = currBoard.squares[move.beginCol][move.beginRow];

        move.setSavedEnPassant(currBoard.getEnPassant());
        move.setSavedEnPassantTargetCol(currBoard.getEnPassantTargetCol());
        move.setSavedEnPassantTargetRow(currBoard.getEnPassantTargetRow());
        move.setSavedWhiteKingsideCastling(currBoard.isWhiteKingsideCastling());
        move.setSavedWhiteQueensideCastling(currBoard.isWhiteQueensideCastling());
        move.setSavedBlackKingsideCastling(currBoard.isBlackKingsideCastling());
        move.setSavedBlackQueensideCastling(currBoard.isBlackQueensideCastling());

        if (move instanceof PromotionMove) {
            updatedBoard.squares[move.beginCol][move.beginRow] = null;
            move.takenPiece = updatedBoard.squares[move.endCol][move.endRow];
            PieceType newPieceType = ((PromotionMove)move).getNewPieceType();
            updatedBoard.squares[move.endCol][move.endRow] = new Piece(newPieceType, movedPiece.getColor());

        }
        else if (move instanceof EnPassantMove) {
            updatedBoard.squares[move.beginCol][move.beginRow] = null;
            updatedBoard.squares[move.endCol][move.endRow] = movedPiece;
            move.takenPiece = updatedBoard.squares[move.endCol][move.beginRow];
            updatedBoard.squares[move.endCol][move.beginRow] = null;

        } else if (move instanceof CastlingMove) {

            if (move.endCol == 2 && move.endRow == 0) {
                updatedBoard.squares[0][0] = null;
                updatedBoard.squares[4][0] = null;
                updatedBoard.squares[3][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
                updatedBoard.squares[2][0] = new Piece(PieceType.KING, PieceColor.WHITE);

            } else if (move.endCol == 6 && move.endRow == 0) {
                updatedBoard.squares[7][0] = null;
                updatedBoard.squares[4][0] = null;
                updatedBoard.squares[5][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
                updatedBoard.squares[6][0] = new Piece(PieceType.KING, PieceColor.WHITE);

            } else if (move.endCol == 2 && move.endRow == 7) {

                updatedBoard.squares[0][7] = null;
                updatedBoard.squares[4][7] = null;
                updatedBoard.squares[3][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
                updatedBoard.squares[2][7] = new Piece(PieceType.KING, PieceColor.BLACK);


            } else if (move.endCol == 6 && move.endRow == 7) {
                updatedBoard.squares[7][7] = null;
                updatedBoard.squares[4][7] = null;
                updatedBoard.squares[5][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
                updatedBoard.squares[6][7] = new Piece(PieceType.KING, PieceColor.BLACK);

            }

        } else {
            updatedBoard.squares[move.beginCol][move.beginRow] = null;
            move.takenPiece = updatedBoard.squares[move.endCol][move.endRow];
            updatedBoard.squares[move.endCol][move.endRow] = movedPiece;
        }

        if (move.beginCol == 0 && move.beginRow == 0) {
            updatedBoard.setWhiteQueensideCastling(false);
        } else if (move.beginCol == 7 && move.beginRow == 0) {
            updatedBoard.setWhiteKingsideCastling(false);
        } else if (move.beginCol == 0 && move.beginRow == 7) {
            updatedBoard.setBlackQueensideCastling(false);
        } else if (move.beginCol == 7 && move.beginRow == 7) {
            updatedBoard.setBlackKingsideCastling(false);
        }

        if (move.endCol == 0 && move.endRow == 0) {
            updatedBoard.setWhiteQueensideCastling(false);
        } else if(move.endCol == 7 && move.endRow == 0) {
            updatedBoard.setWhiteKingsideCastling(false);
        } else if(move.endCol == 0 && move.endRow == 7) {
            updatedBoard.setBlackQueensideCastling(false);
        } else if(move.endCol == 7 && move.endRow == 7) {
            updatedBoard.setBlackKingsideCastling(false);
        }


        if (movedPiece.getType() == PieceType.KING && movedPiece.getColor() == PieceColor.WHITE) {
            updatedBoard.setWhiteKingsideCastling(false);
            updatedBoard.setWhiteQueensideCastling(false);
        } else if(movedPiece.getType() == PieceType.KING && movedPiece.getColor() == PieceColor.BLACK) {
            updatedBoard.setBlackKingsideCastling(false);
            updatedBoard.setBlackQueensideCastling(false);
        }

        if (movedPiece.getType() == PieceType.PAWN && movedPiece.getColor() == PieceColor.WHITE && move.endRow - move.beginRow == 2) {
            updatedBoard.setEnPassant(true);
            updatedBoard.setEnPassantTargetCol(move.beginCol);
            updatedBoard.setEnPassantTargetRow(move.beginRow+1);
        } else if (movedPiece.getType() == PieceType.PAWN && movedPiece.getColor() == PieceColor.BLACK && move.endRow - move.beginRow == -2) {
            updatedBoard.setEnPassant(true);
            updatedBoard.setEnPassantTargetCol(move.beginCol);
            updatedBoard.setEnPassantTargetRow(move.beginRow-1);
        } else {
            updatedBoard.setEnPassant(false);
        }

        if (updatedBoard.activeColor == PieceColor.WHITE) {
            updatedBoard.activeColor = PieceColor.BLACK;
        } else {
            updatedBoard.activeColor = PieceColor.WHITE;
        }

        return updatedBoard;
    }


    public static Board undoMove(Board currBoard, Move move) {
        Board updatedBoard = new Board(currBoard);
        
        updatedBoard.setWhiteKingsideCastling(move.isSavedWhiteKingsideCastling());
        updatedBoard.setWhiteQueensideCastling(move.isSavedWhiteQueensideCastling());
        updatedBoard.setBlackKingsideCastling(move.isSavedBlackKingsideCastling());
        updatedBoard.setBlackQueensideCastling(move.isSavedBlackQueensideCastling());

        updatedBoard.setEnPassant(move.isSavedEnPassant());
        updatedBoard.setEnPassantTargetCol(move.getSavedEnPassantTargetCol());
        updatedBoard.setEnPassantTargetRow(move.getSavedEnPassantTargetRow());

        if (move instanceof PromotionMove) {
            PieceColor pawnColor = updatedBoard.squares[move.endCol][move.endRow].getColor();
            updatedBoard.squares[move.endCol][move.endRow] = move.takenPiece;
            updatedBoard.squares[move.beginCol][move.beginRow] = new Piece(PieceType.PAWN, pawnColor);

        } else if (move instanceof EnPassantMove) {
            Piece movedPiece = updatedBoard.squares[move.endCol][move.endRow];
            updatedBoard.squares[move.endCol][move.endRow] = null;
            updatedBoard.squares[move.beginCol][move.beginRow] = movedPiece;
            updatedBoard.squares[move.endCol][move.beginRow] = move.takenPiece;
            
        } else if (move instanceof CastlingMove) {
            if (move.endCol == 2 && move.endRow == 0) {
                updatedBoard.squares[0][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
                updatedBoard.squares[4][0] = new Piece(PieceType.KING, PieceColor.WHITE);
                updatedBoard.squares[3][0] = null;
                updatedBoard.squares[2][0] = null;

            } else if (move.endCol == 6 && move.endRow == 0) {
                updatedBoard.squares[7][0] = new Piece(PieceType.ROOK, PieceColor.WHITE);
                updatedBoard.squares[4][0] = new Piece(PieceType.KING, PieceColor.WHITE);
                updatedBoard.squares[5][0] = null;
                updatedBoard.squares[6][0] = null;

            } else if (move.endCol == 2 && move.endRow == 7) {
                updatedBoard.squares[0][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
                updatedBoard.squares[4][7] = new Piece(PieceType.KING, PieceColor.BLACK);
                updatedBoard.squares[3][7] = null;
                updatedBoard.squares[2][7] = null;
            } else if (move.endCol == 6 && move.endRow == 7) {
                updatedBoard.squares[7][7] = new Piece(PieceType.ROOK, PieceColor.BLACK);
                updatedBoard.squares[4][7] = new Piece(PieceType.KING, PieceColor.BLACK);
                updatedBoard.squares[5][7] = null;
                updatedBoard.squares[6][7] = null;
            }
        } else {
            Piece movedPiece = updatedBoard.squares[move.endCol][move.endRow];
            updatedBoard.squares[move.endCol][move.endRow] = move.takenPiece;
            updatedBoard.squares[move.beginCol][move.beginRow] = movedPiece;
        }

        return updatedBoard;
    }
    
}
