package Szachy_Programowanie_Zespolowe.Controllers.Private;

import Szachy_Programowanie_Zespolowe.Models.User;
import Szachy_Programowanie_Zespolowe.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("getUserDetails")
    public ResponseEntity getUserDetails(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }
}
