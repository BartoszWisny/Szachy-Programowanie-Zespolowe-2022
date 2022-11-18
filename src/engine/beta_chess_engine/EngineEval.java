package engine.beta_chess_engine;

import engine.moves.Move;

public record EngineEval(Move outMove, int positionEval) { }
