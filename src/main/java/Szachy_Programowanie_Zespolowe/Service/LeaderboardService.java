package Szachy_Programowanie_Zespolowe.Service;

import Szachy_Programowanie_Zespolowe.Models.Game;
import Szachy_Programowanie_Zespolowe.Models.LeaderboardEntry;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.cloud.firestore.Query.Direction;
import com.google.firebase.cloud.FirestoreClient;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class LeaderboardService {

    public List<LeaderboardEntry> getLeaderboard() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference leaderboards = db.collection("leaderboards");
        Query query = leaderboards.orderBy("points", Direction.DESCENDING);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        ArrayList<LeaderboardEntry> leaderboardEntryList = new ArrayList<>(documents.stream().map(document -> document.toObject(LeaderboardEntry.class)).collect(Collectors.toList()));

        return leaderboardEntryList;
    }
	
}
