package engine.testing;

import engine.beta_chess_engine.Engine;
import engine.board_and_pieces.Board;
import engine.board_and_pieces.Piece;
import engine.board_and_pieces.PieceColor;
import engine.moves.Move;
import engine.moves.MoveGenerator;
import engine.utils.MoveHandler;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;


public class PlayAI extends JFrame {

    private final int depth;
    private Board board;
    private JPanel gamePanel;
    private ArrayList<ChessField> fields;
    private boolean gameON;

    private ChessField startField;
    private boolean moveNotMade;
    private int clickCount;


    PlayAI(Board board, int depth) {
        this.depth = depth;
        this.setTitle("PlayAI");
        this.setBounds(100, 50, 500, 500);

        this.addChessBoard(board);
        this.add(gamePanel);

        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
        this.setResizable(false);
        this.setVisible(true);
    }


    private void addChessBoard(Board board) {
        this.fields = new ArrayList<>();
        this.gamePanel = new JPanel();
        this.gamePanel.setDoubleBuffered(true);
        this.gamePanel.setLayout(new GridLayout(8, 8, 1, 1));

        this.board = board;
        for (int i = 7; i >= 0; i--) {
            for (int j = 0; j <= 7; j++) {
                FieldColor color = ((i + j) % 2 == 1) ? FieldColor.WHITE : FieldColor.BLACK;
                ChessField chessField = new ChessField(i, j, board.squares[j][i], color);
                chessField.addMouseListener(new MouseAdapter() {
                    @Override
                    public void mouseClicked(MouseEvent e) {
                        onMouseClicked(e);
                    }
                });
                this.gamePanel.add(chessField);
                this.fields.add(chessField);
            }
        }
    }


    private void updateChessBoard(Board newBoard) {
        this.board = newBoard;

        int idx = 0;
        for (int i = 7; i >= 0; i--) {
            for (int j = 0; j <= 7; j++) {
                if (board.squares[j][i] != null) this.fields.get(idx).setIcon(getPieceIcon(board.squares[j][i]));
                else this.fields.get(idx).setIcon(null);
                this.fields.get(idx).revalidate();
                idx++;
            }
        }
        this.update(this.getGraphics());
    }


    private void onMouseClicked(MouseEvent e) {
        this.clickCount = (this.clickCount + 1) % 3;

        for (ChessField field: this.fields) {
            if (e.getSource() == field) {
                if (clickCount == 1) {
                    this.startField = field;
                    field.setBackground(FieldColor.SELECTED.getColor());
                    break;
                }
                if (clickCount == 2) {
                    startField.setBackground(startField.color.getColor());
                    List<Move> moves = MoveGenerator.getPossibleMoves(this.board);
                    if (moves.size() == 0) {
                        if (this.board.isWhiteKingAttacked()) {
                            JOptionPane.showMessageDialog(this, "GAME OVER, YOU LOST");
                            this.setVisible(false);
                        }
                        if (this.board.isBlackKingAttacked()) {
                            JOptionPane.showMessageDialog(this, "GAME OVER, YOU WON");
                            this.setVisible(false);
                        }
                        else {
                            JOptionPane.showMessageDialog(this, "GAME OVER, DRAW");
                            this.setVisible(false);
                        }
                        break;
                    }
                    for (Move move: moves) {
                        if (startField.column == move.beginCol && startField.row == move.beginRow && field.column == move.endCol && field.row == move.endRow) {
                            updateChessBoard(MoveHandler.makeMove(board, move)); // Your move
                            moves = MoveGenerator.getPossibleMoves(this.board);
                            if (moves.size() == 0) {
                                if (this.board.isWhiteKingAttacked()) {
                                    JOptionPane.showMessageDialog(this, "GAME OVER, YOU LOST");
                                    this.setVisible(false);
                                }
                                if (this.board.isBlackKingAttacked()) {
                                    JOptionPane.showMessageDialog(this, "GAME OVER, YOU WON");
                                    this.setVisible(false);
                                }
                                else {
                                    JOptionPane.showMessageDialog(this, "GAME OVER, DRAW");
                                    this.setVisible(false);
                                }
                                break;
                            }
                            updateChessBoard(MoveHandler.makeMove(this.board, Engine.findBestMove(this.board, this.depth).outMove())); // Engine move
                            this.clickCount = 0;
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }


    private ImageIcon getPieceIcon(Piece piece) {
        if (piece.getColor() == PieceColor.WHITE) {
            switch (piece.getType()) {
                case PAWN -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_plt60.png");
                }
                case KNIGHT -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_nlt60.png");
                }
                case BISHOP -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_blt60.png");
                }
                case ROOK -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_rlt60.png");
                }
                case QUEEN -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_qlt60.png");
                }
                case KING -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_klt60.png");
                }
                default -> {
                    return null;
                }
            }
        }
        else {
            switch (piece.getType()) {
                case PAWN -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_pdt60.png");
                }
                case KNIGHT -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_ndt60.png");
                }
                case BISHOP -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_bdt60.png");
                }
                case ROOK -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_rdt60.png");
                }
                case QUEEN -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_qdt60.png");
                }
                case KING -> {
                    return new ImageIcon("src/engine/testing/graphics/Chess_kdt60.png");
                }
                default -> {
                    return null;
                }
            }
        }
    }


    private class ChessField extends JLabel {
        int row;
        int column;
        FieldColor color;
        Piece piece;

        ChessField(int row, int column, Piece piece, FieldColor color) {
            this.row = row;
            this.column = column;
            this.piece = piece;
            this.color = color;

            if (piece != null) this.setIcon(getPieceIcon(piece));
            this.setBackground(color.getColor());
            this.setOpaque(true);
        }
    }


    private enum FieldColor {
        WHITE(new Color(255, 220, 182)),
        BLACK(new Color(255,  89,  89)),
        SELECTED(new Color(162, 95, 95));
        final Color color;

        FieldColor(Color color) { this.color = color; }
        Color getColor() { return  this.color; }
    }
}
