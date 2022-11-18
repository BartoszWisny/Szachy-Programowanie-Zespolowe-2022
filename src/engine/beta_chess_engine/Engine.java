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


    public EngineEval findBestMove(int depth) {
        return negatedMinMax(board, depth);
    }


    EngineEval negatedMinMax(Board board, int depth) {
        if (depth == 0) return new EngineEval(null, Evaluator.evaluate(board));
        int max = Integer.MIN_VALUE;

        EngineEval result;
        Move outMove = null;
        int score;

        Move[] moves = MoveGenerator.getPossibleMoves(board);
        for (Move move : moves) {
            result = negatedMinMax(MoveHandler.makeMove(board, move), (depth - 1));
            score = -result.positionEval();

            if (score > max) {
                max = score;
                outMove = move;
            }
        }
        return  new EngineEval(outMove, max);
    }

    private void mapPossibilities() {}


    private void updateBoard(Move move) {
        this.board = MoveHandler.makeMove(board, move);
    }
}
