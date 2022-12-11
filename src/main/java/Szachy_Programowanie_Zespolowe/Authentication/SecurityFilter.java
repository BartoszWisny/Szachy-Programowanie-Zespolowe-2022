package Szachy_Programowanie_Zespolowe.Authentication;

import Szachy_Programowanie_Zespolowe.Models.CredentialType;
import Szachy_Programowanie_Zespolowe.Models.Credentials;
import Szachy_Programowanie_Zespolowe.Models.SecurityProperties;
import Szachy_Programowanie_Zespolowe.Models.User;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    public SecurityService securityService;

    @Autowired
    public SecurityProperties restSecurityProperties;

    @Autowired
    public CookieUtils cookieUtils;

    @Autowired
    public SecurityProperties securityProperties;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        verifyToken(request);
        filterChain.doFilter(request, response);
    }

    private void verifyToken(HttpServletRequest request) {
        String session = null;
        FirebaseToken decodedToken = null;
        CredentialType type = null;
        boolean strictServerSessionEnabled = securityProperties.getFirebaseProperties().isEnableStrictServerSession();
        Cookie sessionCookie = cookieUtils.getCookie("session");
        String token = securityService.getBearerToken(request);

        logger.info(token);

        try {
            if (sessionCookie != null) {
                session = sessionCookie.getValue();
                decodedToken = FirebaseAuth.getInstance().verifySessionCookie(session, securityProperties.getFirebaseProperties().isEnableCheckSessionRevoked());
                type = CredentialType.SESSION;
            } else if (!strictServerSessionEnabled) {
                if (token != null && !token.equalsIgnoreCase("undefined")) {
                    decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                    type =  CredentialType.ID_TOKEN;
                }
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            log.error("Firebase Exception:: ", e.getLocalizedMessage());
        }

        User user = firebaseTokenToUserDto(decodedToken);

        if (user != null) {
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, new Credentials(type, decodedToken, token, session), null);
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    private User firebaseTokenToUserDto(FirebaseToken decodedToken) {
        User user = null;

        if (decodedToken != null) {
            user = new User();
            user.setUid(decodedToken.getUid());
            user.setName(decodedToken.getName());
            user.setEmail(decodedToken.getEmail());
            user.setPicture(decodedToken.getPicture());
            user.setIssuer(decodedToken.getIssuer());
            user.setEmailVerified(decodedToken.isEmailVerified());
        }

        return user;
    }

}