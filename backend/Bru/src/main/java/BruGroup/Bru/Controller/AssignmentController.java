package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.*;
import BruGroup.Bru.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AssignmentController {

    @Autowired
    AssignmentRepository assignmentRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    CourseLessonRepository curriculumRepository;

    @Autowired
    LessonRepository lessonRepository;

    @GetMapping(path = "/allAssignment")
    @CrossOrigin(origins = "*")
    public List<Assignment> allAssignment() {
        return assignmentRepository.findAll();
    }

    @PostMapping(path = "/deleteAssignment")
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteAssignment (@RequestBody AssignmentIdentity assignmentIdentity) {
        assignmentRepository.delete(assignmentRepository.findByAssignmentIdentity(assignmentIdentity));
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/addAssignment")
    @CrossOrigin(origins = "*")
    public ResponseEntity addAssignment(@RequestBody AssignmentIdentity assignmentIdentity) {
        Assignment assignment = new Assignment(assignmentIdentity);
        assignmentRepository.save(assignment);
        return ResponseEntity.ok(null);
    }

    @GetMapping(path = "/getAssignmentLessonId/{lessonId}")
    @CrossOrigin(origins = "*")
    public List<Assignment> getAssignmentLessonId(@PathVariable int lessonId) {
        List<Assignment> assignmentList = assignmentRepository.findByAssignmentIdentityLessonId(lessonId);
        return assignmentList;
    }

    @GetMapping(path = "/getStudentAssignments/{email}")
    @CrossOrigin(origins = "*")
    public ResponseEntity getStudentAssignments(@PathVariable String email) {
        List<Student> studentKeys = studentRepository.findByStudentIdentityEmail(email);
        List<Course> courses =  studentKeys
                .stream()
                .map(student -> courseRepository.findByCourseId(student.getStudentIdentity().getCourseId()))
                .collect(Collectors.toList());
        List<CourseProgress> courseProgresses = courses
                .stream()
                .map(course -> new CourseProgress(course, getLessonProgress(course, email)))
                .collect(Collectors.toList());
        return ResponseEntity.ok(courseProgresses);

    }

    public List<LessonProgress> getLessonProgress(Course course, String email) {
        List<CourseLesson> lessonsIds = curriculumRepository.findByCourseLessonIdentityCourseId(course.getCourseId());
        if (lessonsIds == null) {
            return new ArrayList<>();
        }
        List<Lesson> lessons = lessonsIds
                .stream()
                .map(id -> lessonRepository.findByLessonId(id.getCourseLessonIdentity().getLessonId()))
                .collect(Collectors.toList());
        List<LessonProgress> lessonProgresses = lessons
                .stream()
                .map(lesson -> {
                    AssignmentIdentity id = new AssignmentIdentity(email,course.getCourseId(),lesson.getLessonId());
                    boolean isCompleted = assignmentRepository.existsById(id);
                    return new LessonProgress(lesson,isCompleted);
                })
                .collect(Collectors.toList());
        return lessonProgresses;
    }
}

class CourseProgress {
    Course course;
    List<LessonProgress> lessonProgress;

    public CourseProgress(Course course, List<LessonProgress> lessonProgress) {
        this.course = course;
        this.lessonProgress = lessonProgress;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<LessonProgress> getLessonProgress() {
        return lessonProgress;
    }

    public void setLessonProgress(List<LessonProgress> lessonProgress) {
        this.lessonProgress = lessonProgress;
    }
}

class LessonProgress {
    private Lesson lesson;
    private boolean isCompleted;

    public LessonProgress(Lesson lesson, boolean isCompleted) {
        this.lesson = lesson;
        this.isCompleted = isCompleted;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }
}
