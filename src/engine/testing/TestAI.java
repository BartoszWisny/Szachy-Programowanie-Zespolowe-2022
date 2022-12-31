package engine.testing;

import engine.board_and_pieces.Board;
import engine.moves.MoveGenerator;
import engine.utils.BoardUtils;
import engine.utils.HelperKt;


public class TestAI {
    public static void main(String[] args) {
        new PlayAI(BoardUtils.boardSetup(), 3);
    }
}
