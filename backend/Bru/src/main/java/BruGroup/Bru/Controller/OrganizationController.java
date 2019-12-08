package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.*;
import BruGroup.Bru.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class OrganizationController {

    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    StepRepository stepRepository;

    @Autowired
    ToolRepository toolRepository;

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

    @GetMapping (path = "/organizationInformation/{email}")
    @CrossOrigin(origins = "*")
    public ResponseEntity getOrganizationInformation (@PathVariable String email) {
        List<Account> instructors = accountRepository.findByOrganizationEmail(email);
        List<Organization> lessonKeys = organizationRepository.findByEmail(email);
        List<Lesson> publishedLessons = lessonKeys
                .stream()
                .map(lessonKey -> lessonRepository.findByLessonId(lessonKey.getLessonId()))
                .collect(Collectors.toList());
        OrganizationInformation response = new OrganizationInformation(instructors,publishedLessons);
        return ResponseEntity.ok(response);
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
        List<Step> steps = stepRepository.findByStepIdentityLessonId(organization.getLessonId());
        List<Step> incompleteSteps = steps.stream().filter(step -> !isStepComplete(step)).collect(Collectors.toList());
        if (!incompleteSteps.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Account instructorAccount = accountRepository.findByEmail(organization.getEmail());
        organization.setEmail(instructorAccount.getOrganizationEmail());
        organizationRepository.save(organization);
        return ResponseEntity.ok(null);
    }


    public boolean isStepComplete(Step step) {
        if (!step.isComplete()) {
            return false;
        }
        int lessonId = step.getStepIdentity().getLessonId();
        int stepNumber = step.getStepIdentity().getStepNumber();
        List<Tool> tools = toolRepository.findByToolIdentityLessonIdAndToolIdentityStepNumber(lessonId, stepNumber);
        return !tools.isEmpty();
    }
}

class OrganizationInformation {
    private List<Account> instructors;
    private List<Lesson> lessons;

    public OrganizationInformation(List<Account> instructors, List<Lesson> lessons) {
        this.instructors = instructors;
        this.lessons = lessons;
    }

    public List<Account> getInstructors() {
        return instructors;
    }

    public void setInstructors(List<Account> instructors) {
        this.instructors = instructors;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
    }
}
