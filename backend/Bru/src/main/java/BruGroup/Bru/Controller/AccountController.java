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
    public ResponseEntity<Account> login(@RequestBody Account account) {
        Account dbAccount = accountRepository.findByEmail(account.getEmail());
        if (dbAccount == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        if (dbAccount.getPassword().equals(account.getPassword())) {
            return ResponseEntity.status(HttpStatus.OK).body(dbAccount);
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
}
