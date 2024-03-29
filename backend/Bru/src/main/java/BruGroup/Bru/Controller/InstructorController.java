package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.*;
import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.CourseRepository;
import BruGroup.Bru.Repository.InstructorRepository;
import BruGroup.Bru.Repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class InstructorController {

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    CourseRepository courseRepository;

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

    @PostMapping(path = "/addCourseInstructors")
    @CrossOrigin(origins = "*")
    public ResponseEntity addCourseInstructors (@RequestBody AddMultipleBody body) {
        List<String> emails = body.getIds();
        String courseId = body.getParam();

        if (!validAccounts(emails, "INSTRUCTOR")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        InstructorIdentity identity;
        Instructor instructor;

        for (String email: emails) {
            identity = new InstructorIdentity(email, courseId);
            instructor = new Instructor(identity);
            instructorRepository.save(instructor);
        }
        return ResponseEntity.ok(null);
    }

    @PostMapping (path = "/getInstructor/USELESS")
    @CrossOrigin (origins = "*")
    public ResponseEntity getInstructor(@RequestBody InstructorIdentity instructorIdentity) {
        Instructor dbInstructor = instructorRepository.findByInstructorIdentity(instructorIdentity);
        if (dbInstructor == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(null);
    }

    @GetMapping (path="/getInstructor/{email}")
    @CrossOrigin (origins = "*")
    public ResponseEntity getInstructorInformation (@PathVariable String email) {
        List<Instructor> instructorKeys = instructorRepository.findByInstructorIdentityEmail(email);
        List<Lesson> lessonList = lessonRepository.findByInstructorEmail(email);

        List<Course> courses = getCourses(instructorKeys);
        InstructorInformation info = new InstructorInformation(courses,lessonList);
        return ResponseEntity.ok(info);
    }

    //get instructor's courses
    @GetMapping (path = "/getCourses/{email}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public List<Instructor> getInstructorCourse (@PathVariable String email) {
        List<Instructor> instructorList = instructorRepository.findByInstructorIdentityEmail(email);
        return instructorList;
    }


    //get course instructors
    @GetMapping (path = "/getInstructors/{courseId}", produces = "application/json")
    @CrossOrigin(origins = "*")
    public List<Instructor> getCourseInstructor (@PathVariable String courseId) {
        List<Instructor> instructorList = instructorRepository.findByInstructorIdentityCourseId(courseId);
        return instructorList;
    }

    public List<Course> getCourses(List<Instructor> instructorKeys) {
        List<Course> courses = new ArrayList<>();
        Course currentCourse = null;
        for (Instructor instructor : instructorKeys) {
            currentCourse = courseRepository.findByCourseId(instructor.getInstructorIdentity().getCourseId());
            courses.add(currentCourse);
        }
        return courses;
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

class InstructorInformation {
    List<Course> courses;
    List<Lesson> lessons;

    public InstructorInformation() {

    }

    public InstructorInformation(List<Course> courses, List<Lesson> lessons) {
        this.courses = courses;
        this.lessons = lessons;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
    }
}
