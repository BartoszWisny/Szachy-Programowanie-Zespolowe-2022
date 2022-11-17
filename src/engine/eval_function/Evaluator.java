package engine.eval_function;

import engine.board_and_pieces.Board;
import engine.board_and_pieces.Piece;
import engine.board_and_pieces.PieceColor;
import engine.board_and_pieces.PieceType;

public class Evaluator {

    public static double evaluate(Board board) {
        int evaluation = 0;
        Piece currentPiece;

        for (int row = 0; row < board.squares.length; row ++) {
            for (int column = 0; column < board.squares[row].length; column++) {

                currentPiece = board.squares[row][column];
                if (!(currentPiece == null)) {
                    evaluation += calcPieceValue(currentPiece, row, column) *
                            board.activeColor.getColorValue();
                }
            }
        }

        return evaluation;
    }


    private static int calcPieceValue(Piece piece, int row, int column) {
        if (piece.getColor() == PieceColor.BLACK) {
            row = (ConstValues.BOARD_ROWS - 1) - row;
        }

        int pieceValue;
        pieceValue = piece.getColor().getColorValue() *
                     piece.getType().getTypeValue() +
                     positionImpact(piece.getType(), row, column);

        return pieceValue;
    }


    private static int positionImpact(PieceType type, int row, int column) {
        int positionAspectVal = 0;

        switch (type) {
            case PAWN   -> positionAspectVal = EvalTables.PAWN_POSITION_VALUE_TABLE[row][column];
            case KNIGHT -> positionAspectVal = EvalTables.KNIGHT_POSITION_VALUE_TABLE[row][column];
            case BISHOP -> positionAspectVal = EvalTables.BISHOP_POSITION_VALUE_TABLE[row][column];
            case ROOK   -> positionAspectVal = EvalTables.ROOK_POSITION_VALUE_TABLE[row][column];
            case QUEEN  -> positionAspectVal = EvalTables.QUEEN_POSITION_VALUE_TABLE[row][column];
            case KING   -> positionAspectVal = EvalTables.KING_POSITION_VALUE_TABLE[row][column];
        }

        return positionAspectVal;
    }
}
