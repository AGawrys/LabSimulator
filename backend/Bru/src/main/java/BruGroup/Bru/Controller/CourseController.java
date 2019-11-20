package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Course;
import BruGroup.Bru.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
public class CourseController {

    final int COURSE_CODE_LENGTH = 5;
    final String COURSE_CODE_OPTIONS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

    @Autowired
    CourseRepository courseRepository;

    @GetMapping (path="/allCourses")
    @CrossOrigin(origins="*")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping (path="/createCourse")
    @CrossOrigin(origins="*")
    public ResponseEntity createCourse(@RequestBody Course course) {
        String courseID = generateCourseID();
        while (courseRepository.findByCourseID(courseID) != null) {
            courseID = generateCourseID();
        }
        Course savedCourse = new Course(course.getName());
        savedCourse.setId(courseID);
        courseRepository.save(course);
        return ResponseEntity.ok(null);
    }

    @PostMapping (path="/deleteCourse/{courseId}", produces = "application/json")
    @CrossOrigin(origins= "*")
    public ResponseEntity deleteCourse(@PathVariable String courseId) {
        Course course = courseRepository.findByCourseID(courseId);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        courseRepository.delete(course);
        return ResponseEntity.ok(null);
    }

    private String generateCourseID() {
        StringBuilder courseCode = new StringBuilder(COURSE_CODE_LENGTH);
        Random random = new Random();
        int index = 0;

        for (int i = 0; i < COURSE_CODE_LENGTH; i++) {
            index = random.nextInt(COURSE_CODE_OPTIONS.length());
            courseCode.append(COURSE_CODE_OPTIONS.charAt(index));
        }
        return courseCode.toString();
    }


}
