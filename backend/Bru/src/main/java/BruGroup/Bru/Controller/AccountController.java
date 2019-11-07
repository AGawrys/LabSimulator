package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Account;
import BruGroup.Bru.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccountController {

    @Autowired
    AccountRepository accountRepository;

    @GetMapping (path = "/allAccounts")
    @CrossOrigin(origins = "*")
    public List<Account> allAccounts(){
        return accountRepository.findAll();
    }

    @PostMapping (path = "/createAccount")
    @CrossOrigin(origins = "*")
    public ResponseEntity createAccount(@RequestBody Account account) {
        System.out.print(account.getRole());
        if (accountRepository.findByEmail(account.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email has been used.");
        }
        accountRepository.save(account);
        return ResponseEntity.ok(null);
    }

    @PostMapping (path = "/account")
    @CrossOrigin(origins = "*")
    public ResponseEntity login(@RequestBody Account account) {
        Account dbAccount = accountRepository.findByEmail(account.getEmail());
        if (dbAccount == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email has not been registered.");
        }
        if (dbAccount.getPassword().equals(account.getPassword())) {
            return ResponseEntity.ok(null);
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect Password.");
        }
    }
}
