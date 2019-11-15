package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Account;
import BruGroup.Bru.Entity.Instructor;
import BruGroup.Bru.Entity.InstructorIdentity;
import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InstructorController {

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping (path = "/allInstructors")
    @CrossOrigin(origins = "*")
    public List<Instructor> allInstructors() {
        return instructorRepository.findAll();
    }

    @PostMapping(path = "/deleteInstructorCourse")
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteInstructorCourse (@RequestBody InstructorIdentity instructorIdentity) {
        Instructor instructor = new Instructor(instructorIdentity);
        instructorRepository.delete(instructor);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/addInstructorCourse")
    @CrossOrigin(origins = "*")
    public ResponseEntity addInstructorCourse (@RequestBody InstructorIdentity instructorIdentity) {
        //check if courseId is valid
        Account dbAccount = accountRepository.findByEmail(instructorIdentity.getEmail());
        if (dbAccount == null || !(dbAccount.getRole().equals("INSTRUCTOR"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Instructor instructor = new Instructor(instructorIdentity);
        instructorRepository.save(instructor);
        return ResponseEntity.ok(null);
    }

    @PostMapping (path = "/getInstructor")
    @CrossOrigin (origins = "*")
    public ResponseEntity getInstructor(@RequestBody InstructorIdentity instructorIdentity) {
        Instructor dbInstructor = instructorRepository.findByInstructorIdentity(instructorIdentity);
        if (dbInstructor == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(null);
    }

    //get insturctor's coureses
    @GetMapping (path = "/getInstructorCourse/{email}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public List<Instructor> getInstructorCourse (@PathVariable String email) {
        List<Instructor> instructorList = instructorRepository.findByInstructorIdentityEmail(email);
        return instructorList;
    }

    //get courses insructors
    @GetMapping (path = "/getCourseInstructor/{courseId}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public List<Instructor> getCourseInstructor (@PathVariable String courseId) {
        List<Instructor> instructorList = instructorRepository.findByInstructorIdentityCourseId(courseId);
        return instructorList;
    }
}
