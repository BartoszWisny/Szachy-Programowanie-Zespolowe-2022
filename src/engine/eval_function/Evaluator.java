package engine.eval_function;

import engine.board_and_pieces.Board;
import engine.board_and_pieces.Piece;
import engine.board_and_pieces.PieceColor;
import engine.board_and_pieces.PieceType;

public class Evaluator {

    public static int evaluate(Board board) {
        int evaluation = 0;
        Piece currentPiece;

        for (int row = 0; row < ConstValues.BOARD_ROWS; row ++) {
            for (int column = 0; column < ConstValues.BOARD_COLS; column++) {

                currentPiece = board.squares[row][column];
                if (!(currentPiece == null)) {
                    evaluation += calcTotalPieceValue(currentPiece, row, column);
                }
            }
        }

        return evaluation;
    }


    private static int calcTotalPieceValue(Piece piece, int row, int column) {
        return piece.getValue() + positionImpact(piece, row, column);
    }


    private static int positionImpact(Piece piece, int row, int column) {
        if (piece.getColor() == PieceColor.BLACK) {
            row = (ConstValues.BOARD_ROWS - 1) - row;
        }

        int positionAspectVal = 0;

        switch (piece.getType()) {
            case PAWN   -> positionAspectVal = EvalTables.PAWN_POSITION_VALUE_TABLE[row][column];
            case KNIGHT -> positionAspectVal = EvalTables.KNIGHT_POSITION_VALUE_TABLE[row][column];
            case BISHOP -> positionAspectVal = EvalTables.BISHOP_POSITION_VALUE_TABLE[row][column];
            case ROOK   -> positionAspectVal = EvalTables.ROOK_POSITION_VALUE_TABLE[row][column];
            case QUEEN  -> positionAspectVal = EvalTables.QUEEN_POSITION_VALUE_TABLE[row][column];
            case KING   -> positionAspectVal = EvalTables.KING_POSITION_VALUE_TABLE[row][column];
        }

        return positionAspectVal * piece.getColor().getColorValue();
    }
}
