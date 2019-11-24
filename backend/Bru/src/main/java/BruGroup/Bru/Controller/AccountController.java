package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Account;
import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.InstructorRepository;
import BruGroup.Bru.Repository.LessonRepository;
import com.oracle.javafx.jmx.json.JSONException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.lang3.time.DateUtils;

import java.security.Key;
import java.util.Date;
import java.util.List;

@RestController
public class AccountController {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    LessonRepository lessonRepository;


    Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @GetMapping (path = "/allAccounts")
    @CrossOrigin(origins = "*")
    public List<Account> allAccounts(){
        return accountRepository.findAll();
    }

    @PostMapping (path = "/createAccount")
    @CrossOrigin(origins = "*")
    public ResponseEntity createAccount(@RequestBody Account account) {
        if (accountRepository.findByEmail(account.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        if (account.getRole().equals("INSTRUCTOR")) {
            if (accountRepository.findByEmail(account.getOrganizationEmail()) == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }

        accountRepository.save(account);
        return ResponseEntity.ok(null);
    }

    @PostMapping (path = "/account")
    @CrossOrigin(origins = "*")
    public ResponseEntity<TokenCreationResponse> login(@RequestBody Account account) {
        Account dbAccount = accountRepository.findByEmail(account.getEmail());
        if (dbAccount == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        if (dbAccount.getPassword().equals(account.getPassword())) {
            String jwt = Jwts.builder()
                    .setSubject(account.getEmail())
                    .setExpiration(getExpirationDate())
                    .setIssuedAt(new Date())
                    .signWith(key)
                    .compact();
            TokenCreationResponse response = new TokenCreationResponse(jwt, dbAccount.getRole());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping (path = "/account/{email}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public ResponseEntity getAccount(@PathVariable String email) {
        Account account = accountRepository.findByEmail(email);
        return ResponseEntity.ok(account);
    }

    @GetMapping (path = "/accountName/{email}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public ResponseEntity getAccountName(@PathVariable String email) {
        Account account = accountRepository.findByEmail(email);
        return ResponseEntity.ok(account.getName());
    }

    @GetMapping (path = "/OrganizationAccounts/{organizationEmail}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public List<Account> getOrganizationAccounts(@PathVariable String organizationEmail) {
        List<Account> accountList = accountRepository.findByOrganizationEmail(organizationEmail);
        return accountList;
    }

    @PostMapping (path = "/token-auth")
    @CrossOrigin(origins = "*")
    public ResponseEntity verifyToken(@RequestBody String token) throws JSONException {
        Jws<Claims> jws;
        try {
            jws = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token);
            Date expirationDate = jws.getBody().getExpiration();
            boolean isExpired = new Date().after(expirationDate);
            if (isExpired) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            else {
                String email = jws.getBody().getSubject();
                Account dbAccount = accountRepository.findByEmail(email);
                TokenVerificationResponse response = new TokenVerificationResponse(email, dbAccount.getRole());
                return ResponseEntity.ok(response);
            }
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    private static Date getExpirationDate() {
        Date currentDate = new Date();
        Date expirationDate = DateUtils.addDays(currentDate, 1);
        return expirationDate;
    }
}

class TokenCreationResponse {
    private String token;
    private String role;

    public TokenCreationResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

class TokenVerificationResponse {
    private String email;
    private String role;

    public TokenVerificationResponse(String email, String role) {
        this.email = email;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
