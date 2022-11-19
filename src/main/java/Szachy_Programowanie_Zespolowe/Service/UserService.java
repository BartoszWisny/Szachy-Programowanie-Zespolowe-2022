package Szachy_Programowanie_Zespolowe.Service;

import Szachy_Programowanie_Zespolowe.Models.UserCreateRequest;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public void createUser(UserCreateRequest userCreateRequest) throws FirebaseAuthException, IllegalArgumentException {
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(userCreateRequest.getEmail())
                .setEmailVerified(false)
                .setPassword(userCreateRequest.getPassword())
                .setDisplayName(userCreateRequest.getDisplayName())
                .setDisabled(false);

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
    }

    public void deleteUser(String uid) throws FirebaseAuthException {
        FirebaseAuth.getInstance().deleteUser(uid);
    }

    public UserRecord getUserByEmail(String email) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().getUserByEmail(email);
    }

    public UserRecord getUserByUid(String uid) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().getUser(uid);
    }
}
