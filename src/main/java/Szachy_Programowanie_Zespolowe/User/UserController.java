package Szachy_Programowanie_Zespolowe.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/getUserDetails")
    public User getPatient(@RequestParam String username) throws InterruptedException, ExecutionException{
        return userService.getUser(username);
    }

    @PostMapping("/createUser")
    public String createUser(@RequestBody User user) throws InterruptedException, ExecutionException {
        return userService.saveUser(user);
    }

    @PutMapping("/updateUser")
    public String updatePatient(@RequestBody User user) throws InterruptedException, ExecutionException {
        return userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser")
    public String deletePatient(@RequestParam String username){
        return userService.deleteUser(username);
    }
}
