package prog_zespolowe.chess_engine_v2;


import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import prog_zespolowe.engine.app_connection.*;
import prog_zespolowe.engine.board_and_pieces.PieceType;
import prog_zespolowe.engine.moves.Move;
import prog_zespolowe.engine.moves.PromotionMove;

@RestController
@RequestMapping("/api/")
public class Controller {
	
	/** Wszystkie metody "hello" służą do testowania połączenia z api
	 */
	
	@GetMapping("json_hello/{name}")
    public ResponseEntity<?> sayHello(@PathVariable(value="name") String name) {
        List<String> resource = new ArrayList<String>();
        resource.add("Hello, " + name + "!!!");
        return ResponseEntity.ok(resource);
    }
	
	@GetMapping("json_hello")
    public ResponseEntity<?> sayHello() {
        List<String> resource = new ArrayList<String>();
        resource.add("Hello!!!");
        return ResponseEntity.ok(resource);
    }
	
	@GetMapping("string_hello")
    public String sayNewHello() {
        return "Hello";
    }
	
	@GetMapping("string_hello/{name}")
    public String sayNewHello(@PathVariable(value="name") String name) {
        return "Hello," + name + "!!!";
    }
	
	/**
	 * Aby podłączyć się do API i uzyskać ruch należy uruchomić aplikację i wpisać w przeglądarce 
	 * http://localhost:8080/api/getmove/{FEN String dla pozycji na szachownicy}
	 * FEN String należy podać z podkreślnikami "_" zamiast forslashów "/"
	 */
	
	@GetMapping("getmove/{FEN}")
    public String getMoveString(@PathVariable(value="FEN") String FEN) {
        String result = AppMove.getBestMove(FEN);
		return result;
    }
	
	/**
	 * Można też regulować głębokość, do której schodzi silnik przeszukując drzewo możliwych ruchów
	 * Im większa głębokość, tym lepiej powinien grać (i tym wolniej wykonuje ruchy)
	 * http://localhost:8080/api/getmove/{FEN String dla pozycji na szachownicy}/{Głębokość drzewa}
	 */
	
	@GetMapping("getmove/{FEN}/{depth}")
    public String getMoveStringDepth(@PathVariable(value="FEN") String FEN, @PathVariable(value="depth") int depth) {
        String result = AppMove.getBestMoveDepth(FEN, depth);
		return result;
    }
	
	/**
	 * Można również uzyskać ruch w formacie JSON
	 * http://localhost:8080/api/json_getmove/{FEN String dla pozycji na szachownicy}
	 */
	
	@GetMapping("json_getmove/{FEN}")
    public ResponseEntity<?> getMoveJSON(@PathVariable(value="FEN") String FEN) {
        String result = AppMove.getBestMove(FEN);
        List<String> resource = new ArrayList<String>();
        resource.add(result);
		return ResponseEntity.ok(resource);
    }
	
	/**
	 * Ruch w formacie JSON z podaną głębokością
	 * http://localhost:8080/api/json_getmove/{FEN String dla pozycji na szachownicy}/{Głębokość drzewa}
	 */
	
	@GetMapping("json_getmove/{FEN}/{depth}")
    public ResponseEntity<?> getMoveDepthJSON(@PathVariable(value="FEN") String FEN, @PathVariable(value="depth") int depth) {
        String result = AppMove.getBestMoveDepth(FEN, depth);
        List<String> resource = new ArrayList<String>();
        resource.add(result);
		return ResponseEntity.ok(resource);
    }
	
	/** Metoda zwraca prosty ruch obejmujący promocję piona na hetmana - służy do testowania
	 * 	Moża go uzyskać z API wpisując:
	 *  http://localhost:8080/api/get_promotion_move_test 
	 *  Litery oznaczają promocję na następujące figury:
	 *  r - wieża (rook), n - skoczek (knight), b - goniec (bishop), q - hetman (queen)
	 */
	
	@GetMapping("get_promotion_move_test")
    public String getPromotionMoveString() {
        Move result = new PromotionMove(4, 6, 4, 7, PieceType.QUEEN);
		return result.moveString();
    }
	
}
