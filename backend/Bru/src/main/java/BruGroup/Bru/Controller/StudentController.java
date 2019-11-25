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
    public ResponseEntity enrollStudents (@RequestBody AddMultipleBody body) {
        List<String> emails = body.getIds();
        String courseId = body.getParam();

        if (!validAccounts(emails, "STUDENT")) {
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

    public boolean validAccounts(List<String> emails, String role) {
        for (String email: emails) {
            Account account = accountRepository.findByEmail(email);
            if (account == null || !account.getRole().equals(role)) {
                return false;
            }
        }
        return true;
    }
}

class AddMultipleBody {
    private List<String> ids;
    private String param;

    public AddMultipleBody() {

    }

    public AddMultipleBody(List<String> emails, String param) {
        this.ids = emails;
        this.param = param;
    }

    public List<String> getIds() {
        return ids;
    }

    public void setIds(List<String> emails) {
        this.ids = emails;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String courseId) {
        this.param = courseId;
    }
}

