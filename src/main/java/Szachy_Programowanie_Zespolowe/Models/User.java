package Szachy_Programowanie_Zespolowe.Models;

import lombok.*;

import java.io.Serializable;

@Data
public class User implements Serializable {
    private static final long serialVersionUID = 157442950L;
    private String uid;
    private String name;
    private String email;
    private boolean isEmailVerified;
    private String issuer;
    private String picture;
}
