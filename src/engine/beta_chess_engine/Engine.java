package engine.beta_chess_engine;

import engine.board_and_pieces.Board;
import engine.board_and_pieces.PieceType;
import engine.eval_function.ConstValues;
import engine.eval_function.Evaluator;
import engine.moves.Move;
import engine.moves.MoveGenerator;
import engine.moves.PromotionMove;
import engine.utils.MoveHandler;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Engine {
    public static EngineEval findBestMove(Board board, int depth) {
        //System.out.println(alphaBeta(board, ConstValues.LOSING_SCORE, ConstValues.WINNING_SCORE, depth));
//         return negatedMinMax(board, depth);
        return alphaBetaMax(board, ConstValues.LOSING_SCORE, ConstValues.WINNING_SCORE, depth);
    }


    /**
     * Engine evaluation using upgraded implementation of MinMax algorithm
     * (Working)
     */
    private static EngineEval negatedMinMax(Board board, int depth) {
        if (depth == 0) {
            return new EngineEval(null, Evaluator.evaluate(board));
        }

        Move outMove = null;
        int max = Integer.MIN_VALUE;
        int score ;

        EngineEval tmpResult;
        List<Move> moves = MoveGenerator.getPossibleMoves(board);

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
    private static int alphaBeta(Board board, int alpha, int beta, int depth) {
        if (depth ==  0) {
//            return Evaluator.evaluate(board); // Working
             return quiesce(board, alpha, beta); // NOT Working
        }
        int score;

        List<Move> moves = MoveGenerator.getPossibleMoves(board);
        for (Move move : moves) {
            score = -alphaBeta(MoveHandler.makeMove(board, move), -beta, -alpha, (depth - 1));

            if (score >= beta) { return beta; }
            if (score > alpha) { alpha = score; }
        }

        return alpha;
    }

    /** Quiesce search - upgrade for alpha beta pruning, NOT WORKING */
    private static int quiesce(Board board, int alpha, int beta) {
        int eval = Evaluator.evaluate(board);
        if (eval >= beta) return beta;
        if (eval > alpha) { alpha = eval; }

        int score;
        List<Move> captureMoves = orderMoves(board, MoveGenerator.getCaptureMoves(board));
        for (Move move : captureMoves) {
            score = -quiesce(MoveHandler.makeMove(board, move), -beta, -alpha);

            if (score >= beta) return beta;
            if (score > alpha) { alpha = score; }
        }
        return alpha;
    }

    /** Sorts list of moves based on their quality */
    private static List<Move> orderMoves(Board board, List<Move> moves) {
        moves.sort(Comparator.comparingInt(move -> moveQuality(board, move)));
        return moves;
    }

    /** Defines and calculates the move quality */
    private static int moveQuality(Board board, Move move) {
        int moveScore = 0;

        if (board.squares[move.beginCol][move.beginRow] != null && board.squares[move.endCol][move.endRow] != null) {
            PieceType movePieceType = board.squares[move.beginCol][move.beginRow].getType();
            PieceType capturedPieceType = board.squares[move.endCol][move.endRow].getType();
            moveScore = 10 * capturedPieceType.getTypeValue() - movePieceType.getTypeValue();
        }

        if (move instanceof PromotionMove) {
            moveScore += ((PromotionMove) move).getNewPieceType().getTypeValue();
        }

        return moveScore;
    }


    /**
     * (Working)
     * Engine evaluation using basic implementation of alpha-beta pruning
     * Cooperates with: {@link engine.beta_chess_engine.Engine#alphaBetaMin(Board, int, int, int)}
     */
    private static EngineEval alphaBetaMax(Board board, int alpha, int beta, int depth) {
        if (depth == 0) return new EngineEval(null, Evaluator.evaluate(board));

        int score;
        Move outMove = null;
        List<Move> moves = MoveGenerator.getPossibleMoves(board);
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

    private static EngineEval alphaBetaMin(Board board, int alpha, int beta, int depth) {
        if (depth == 0) return new EngineEval(null, -Evaluator.evaluate(board));

        int score;
        Move outMove = null;
        List<Move> moves = MoveGenerator.getPossibleMoves(board);
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

}
