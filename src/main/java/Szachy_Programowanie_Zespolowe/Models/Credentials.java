package Szachy_Programowanie_Zespolowe.Models;

import com.google.firebase.auth.FirebaseToken;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Credentials {
    private CredentialType type;
    private FirebaseToken decodedToken;
    private String idToken;
    private String session;
}
