package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Account;
import BruGroup.Bru.Entity.Course;
import BruGroup.Bru.Entity.Instructor;
import BruGroup.Bru.Entity.InstructorIdentity;
import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.CourseRepository;
import BruGroup.Bru.Repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    InstructorRepository instructorRepository;

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
