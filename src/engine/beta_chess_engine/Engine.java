package engine.beta_chess_engine;

import engine.board_and_pieces.Board;
import engine.eval_function.Evaluator;
import engine.moves.Move;
import engine.moves.MoveGenerator;
import engine.utils.MoveHandler;

public class Engine {
    private Board board;

    public Engine(Board board) {
        this.board = board;
    }


    public int findBestMove(int depth) {
        int eval = negatedMinMax(board, depth);
        return eval;
    }


    int negatedMinMax(Board board, int depth) {
        if (depth == 0) return Evaluator.evaluate(board);
        int max = Integer.MIN_VALUE;
        int score;

        Move[] moves = MoveGenerator.getPossibleMoves(board);
        for (Move move : moves) {
            score = -negatedMinMax(
                     MoveHandler.makeMove(board, move),
                    (depth - 1)
            );

            if (score > max) {
                max = score;
            }
        }
        return  max;
    }

    private void mapPossibilities() {}


    private void updateBoard(Move move) {
        this.board = MoveHandler.makeMove(board, move);
    }
}
