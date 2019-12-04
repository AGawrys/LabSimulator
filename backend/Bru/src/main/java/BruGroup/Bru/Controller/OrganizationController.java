package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Account;
import BruGroup.Bru.Entity.Organization;
import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class OrganizationController {

    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping (path = "/allOrganization")
    @CrossOrigin(origins = "*")
    public List<Organization> allOrganization() {
        return organizationRepository.findAll();
    }

    //get all lesson of an organization
    @GetMapping (path = "/getOrganizationLesson/{email}")
    @CrossOrigin(origins = "*")
    public List<Organization> getOrganizationLesson (@PathVariable String email) {
        List<Organization> organizationList = organizationRepository.findByEmail(email);
        return  organizationList;
    }

    /*
    //check if single lesson is in an organization
    @PostMapping(path = "/getOrganization")
    @CrossOrigin (origins = "*")
    public ResponseEntity getOrganization (@RequestBody Organization organization) {
        Organization dbOrganization = organizationRepository.findByOrganizationIdentity(organizationIdentity);
        if (dbOrganization == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(null);
    }
     */

    //add lessons to an organization
    @PostMapping (path = "/publishLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity addLessonOrganization (@RequestBody Organization organization) {
        Account instructorAccount = accountRepository.findByEmail(organization.getEmail());
        organization.setEmail(instructorAccount.getOrganizationEmail());
        organizationRepository.save(organization);
        return ResponseEntity.ok(null);
    }
}
