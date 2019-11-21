package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Account;
import BruGroup.Bru.Entity.Student;
import BruGroup.Bru.Entity.StudentIdentity;
import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping(path = "/allStudents")
    @CrossOrigin(origins = "*")
    public List<Student> allStudents(){
        return studentRepository.findAll();
    }

    //check if single student is in a course
    @PostMapping (path = "/getStudent")
    @CrossOrigin (origins = "*")
    public ResponseEntity getStudent (@RequestBody StudentIdentity studentIdentity) {
        Student dbStudent = studentRepository.findByStudentIdentity(studentIdentity);
        if (dbStudent == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/enrollStudents")
    @CrossOrigin(origins = "*")
    public ResponseEntity enrollStudents (@RequestBody AddToCourseBody body) {
        List<String> emails = body.getEmails();
        String courseId = body.getParam();

        if (!validAccounts(emails)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        StudentIdentity identity;
        Student student;

        for (String email: emails) {
            identity = new StudentIdentity(email, courseId);
            student = new Student(identity);
            studentRepository.save(student);
        }
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/deleteStudentCourse")
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteStudentCourse (@RequestBody StudentIdentity studentIdentity) {
        Student student = new Student(studentIdentity);
        studentRepository.delete(student);
        return ResponseEntity.ok(null);
    }

    //gets list of courses through student email
    @GetMapping (path = "/getStudentCourse/{email}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public List<Student> getStudentCourse (@PathVariable String email) {
        List<Student> studentList = studentRepository.findByStudentIdentityEmail(email);
        return studentList;
    }

    //gets list of students through courseId
    @GetMapping (path = "/getCourseStudent/{courseId}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public List<Student> getCourseStudent (@PathVariable String courseId) {
        List<Student> studentList = studentRepository.findByStudentIdentityCourseId(courseId);
        return studentList;
    }

    public boolean validAccounts(List<String> emails) {
        for (String email: emails) {
            Account account = accountRepository.findByEmail(email);
            if (account == null || !account.getRole().equals("STUDENT")) {
                return false;
            }
        }
        return true;
    }
}

class AddToCourseBody {
    private List<String> emails;
    private String param;

    public AddToCourseBody() {

    }

    public AddToCourseBody(List<String> emails, String param) {
        this.emails = emails;
        this.param = param;
    }

    public List<String> getEmails() {
        return emails;
    }

    public void setEmails(List<String> emails) {
        this.emails = emails;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String courseId) {
        this.param = courseId;
    }
}
