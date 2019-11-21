package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.*;
import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.CourseRepository;
import BruGroup.Bru.Repository.InstructorRepository;
import BruGroup.Bru.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping (path="/allCourses")
    @CrossOrigin(origins="*")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping (
            path="/createCourse",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    @CrossOrigin(origins="*")
    public ResponseEntity createCourse(@RequestBody CreateCourseParams params) {
        String courseID = Course.generateCourseID();
        while (courseRepository.findByCourseId(courseID) != null) {
            courseID = Course.generateCourseID();
        }
        Course course = params.getCourse();
        Course savedCourse = new Course(courseID,course.getName(), course.getDescription());
        courseRepository.save(savedCourse);

        InstructorIdentity instructorIdentity = new InstructorIdentity(params.getEmail(), courseID);
        Instructor instructor = new Instructor(instructorIdentity);
        instructorRepository.save(instructor);
        return ResponseEntity.ok(courseID);
    }

    @PostMapping (path="/deleteCourse/{courseId}", produces = "application/json")
    @CrossOrigin(origins= "*")
    public ResponseEntity deleteCourse(@PathVariable String courseId) {
        Course course = courseRepository.findByCourseId(courseId);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        courseRepository.delete(course);
        return ResponseEntity.ok(null);
    }

    @GetMapping (path="getCourse/{courseId}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public ResponseEntity getCourseInformation(@PathVariable String courseId) {
        Course course = courseRepository.findByCourseId(courseId);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<Student> studentList = studentRepository.findByStudentIdentityCourseId(courseId);
        List<Instructor> instructorList = instructorRepository.findByInstructorIdentityCourseId(courseId);

        List<Account> studentAccounts = getStudentAccounts(studentList);
        List<Account> instructorAccounts = getInstructorAccounts(instructorList);
        CourseInformation info = new CourseInformation(course, studentAccounts, instructorAccounts);
        return ResponseEntity.ok(info);
    }

    public List<Account> getStudentAccounts(List<Student> studentList) {
        List<Account> accounts = new ArrayList<>();
        Account currentAccount = null;
        for (Student student: studentList) {
            currentAccount = accountRepository.findByEmail(student.getStudentIdentity().getEmail());
            accounts.add(currentAccount);
        }
        return accounts;
    }

    public List<Account> getInstructorAccounts(List<Instructor> instructorList) {
        List<Account> accounts = new ArrayList<>();
        Account currentAccount = null;
        for (Instructor instructor: instructorList) {
            currentAccount = accountRepository.findByEmail(instructor.getInstructorIdentity().getEmail());
            accounts.add(currentAccount);
        }
        return accounts;
    }
}

class CreateCourseParams {
    private String email;
    private Course course;

    public CreateCourseParams() {

    }

    public CreateCourseParams(String email, Course course) {
        this.email = email;
        this.course = course;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}

class CourseInformation {
    private Course course;
    private List<Account> studentAccounts;
    private List<Account> instructorAccounts;

    public CourseInformation(Course course, List<Account> studentAccounts, List<Account> instructorAccounts) {
        this.course = course;
        this.studentAccounts = studentAccounts;
        this.instructorAccounts = instructorAccounts;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Account> getStudentAccounts() {
        return studentAccounts;
    }

    public void setStudentAccounts(List<Account> studentAccounts) {
        this.studentAccounts = studentAccounts;
    }

    public List<Account> getInstructorAccounts() {
        return instructorAccounts;
    }

    public void setInstructorAccounts(List<Account> instructorAccounts) {
        this.instructorAccounts = instructorAccounts;
    }
}
