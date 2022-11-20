package engine.beta_chess_engine;

import engine.board_and_pieces.Board;
import engine.eval_function.Evaluator;
import engine.moves.Move;
import engine.moves.MoveGenerator;
import engine.utils.MoveHandler;

public class Engine {
    private Board board;
    private int score;

    public Engine(Board board) {
        this.board = board;
    }


    public EngineEval findBestMove(int depth) {
        // return negatedMinMax(board, depth);
        return alphaBetaMax(board, Integer.MIN_VALUE, Integer.MAX_VALUE, depth);
    }


    /**
     * Engine evaluation using upgraded implementation of MinMax algorithm
     * (Working)
     */
    private EngineEval negatedMinMax(Board board, int depth) {
        if (depth == 0) {
            return new EngineEval(null, Evaluator.evaluate(board));
        }

        Move outMove = null;
        int max = Integer.MIN_VALUE;
        int score ;

        EngineEval tmpResult;
        Move[] moves = MoveGenerator.getPossibleMoves(board);

        for (Move move : moves) {
            tmpResult = negatedMinMax(MoveHandler.makeMove(board, move), (depth - 1));
            score = -tmpResult.positionEval();

            if (score > max) {
                max = score;
                outMove = move;
            }
        }
        return  (new EngineEval(outMove, max));
    }


    /**
     * Engine evaluation using upgraded implementation of alpha-beta pruning
     * Cooperates with @quiesce
     * (NOT Working) - problems with quiesce.
     */
    private int alphaBeta(Board board, int alpha, int beta, int depth) {
        if (depth ==  0) return (quiesce(board, alpha, beta));

        Move outMove = null;
        int score = Integer.MIN_VALUE;
        int curr;

        int tmpResult;
        Move[] moves = MoveGenerator.getPossibleMoves(board);
        for (Move move : moves) {
            score = -alphaBeta(MoveHandler.makeMove(board, move), -beta, -alpha, (depth - 1));

            if (score >= beta) return beta;
            if (score > alpha) {
                alpha = score;
            }
        }
        return alpha;
    }

    // TODO: fix quiesce (currently not working), problems with generating attacking moves.
    private int quiesce(Board board, int alpha, int beta) {
        int eval = Evaluator.evaluate(board);
        if (eval >= beta) return beta;
        if (alpha < eval) { alpha = eval; }

        Move[] attackingMoves = MoveGenerator.getAttackingMoves(board, board.activeColor);
        for (Move move : attackingMoves) {
            score = -quiesce(MoveHandler.makeMove(board, move), -beta, -alpha);
            if (score >= beta) return beta;
            if (score > alpha) { alpha = score; }
        }
        return alpha;
    }


    /**
     * Engine evaluation using basic implementation of alpha-beta pruning
     * Cooperates with @alphaBetaMin
     * (Working)
     */
    private EngineEval alphaBetaMax(Board board, int alpha, int beta, int depth) {
        if (depth == 0) return new EngineEval(null, Evaluator.evaluate(board));

        Move outMove = null;
        Move[] moves = MoveGenerator.getPossibleMoves(board);
        for (Move move : moves) {
            score = alphaBetaMin(MoveHandler.makeMove(board, move), alpha, beta, (depth - 1)).positionEval();
            if (score >= beta) return new EngineEval(move, beta);
            if (score > alpha) {
                alpha = score;
                outMove = move;
            }
        }
        return new EngineEval(outMove, alpha);
    }

    private EngineEval alphaBetaMin(Board board, int alpha, int beta, int depth) {
        if (depth == 0) return new EngineEval(null, -Evaluator.evaluate(board));

        Move outMove = null;
        Move[] moves = MoveGenerator.getPossibleMoves(board);
        for (Move move : moves) {
            score = alphaBetaMax(MoveHandler.makeMove(board, move), alpha, beta, (depth - 1)).positionEval();
            if (score <= alpha) return new EngineEval(move, alpha);
            if (score < beta) {
                beta = score;
                outMove = move;
            }
        }
        return new EngineEval(outMove, beta);
    }

    private void updateBoard(Move move) {
        this.board = MoveHandler.makeMove(board, move);
    }
}
