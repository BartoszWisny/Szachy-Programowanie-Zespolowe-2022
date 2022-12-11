package Szachy_Programowanie_Zespolowe.Service;

import Szachy_Programowanie_Zespolowe.Models.Game;
import Szachy_Programowanie_Zespolowe.Models.GameNotFoundException;
import Szachy_Programowanie_Zespolowe.Models.GameResult;
import Szachy_Programowanie_Zespolowe.Models.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class GameService {
    public WriteResult addGame(Game game) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference addedDocRef = db.collection("game").document();
        game.setGameId(addedDocRef.getId());
        ApiFuture<WriteResult> writeResult = addedDocRef.set(game);

        return writeResult.get();
    }

    public WriteResult updateGameGameResult(String gameId, GameResult gameResult) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference updateDocRef = db.collection("game").document(gameId);
        ApiFuture<WriteResult> writeResult = updateDocRef.update("gameResult", gameResult);

        return writeResult.get();
    }

    public WriteResult updateGameWhiteUid(String gameId, String whiteUid) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference updateDocRef = db.collection("game").document(gameId);
        ApiFuture<WriteResult> writeResult = updateDocRef.update("whiteUid", whiteUid);

        return writeResult.get();
    }

    public WriteResult updateGameBlackUid(String gameId, String blackUid) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference updateDocRef = db.collection("game").document(gameId);
        ApiFuture<WriteResult> writeResult = updateDocRef.update("blackUid", blackUid);

        return writeResult.get();
    }

    public WriteResult updateGameDate(String gameId, Date date) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference updateDocRef = db.collection("game").document(gameId);
        ApiFuture<WriteResult> writeResult = updateDocRef.update("date", date);

        return writeResult.get();
    }

    public WriteResult updateGameMoveList(String gameId, String move) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference updateDocRef = db.collection("game").document(gameId);
        ApiFuture<WriteResult> writeResult = updateDocRef.update("moveList", FieldValue.arrayUnion(move));

        return writeResult.get();
    }

    public WriteResult deleteGame(String gameId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference addedDocRef = db.collection("game").document(gameId);
        ApiFuture<WriteResult> writeResult = addedDocRef.delete();

        return writeResult.get();
    }

    public List<Game> getUserGames(User user) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference games = db.collection("game");
        Query query1 = games.whereEqualTo("whiteUid", user.getUid());
        Query query2 = games.whereEqualTo("blackUid", user.getUid());
        ApiFuture<QuerySnapshot> querySnapshot1 = query1.get();
        ApiFuture<QuerySnapshot> querySnapshot2 = query2.get();

        List<QueryDocumentSnapshot> documents = querySnapshot1.get().getDocuments();
        ArrayList<Game> gameList = new ArrayList<>(documents.stream().map(document -> document.toObject(Game.class)).collect(Collectors.toList()));
        documents = querySnapshot2.get().getDocuments();
        gameList.addAll(documents.stream().map(document -> document.toObject(Game.class)).collect(Collectors.toList()));

        return gameList;
    }

    public List<Game> getAllGames() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference games = db.collection("game");
        ApiFuture<QuerySnapshot> querySnapshot = games.get();

        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        ArrayList<Game> gameList = new ArrayList<>(documents.stream().map(document -> document.toObject(Game.class)).collect(Collectors.toList()));

        return gameList;
    }

    public Game getGameByGameId(String gameId) throws ExecutionException, InterruptedException, GameNotFoundException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("game").document(gameId);

        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        Game game = null;

        if (document.exists()) {
            game = document.toObject(Game.class);
        }
        else {
            throw new GameNotFoundException("Game not found.");
        }

        return game;
    }
}
