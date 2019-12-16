package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.*;
import BruGroup.Bru.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    CourseLessonRepository curriculumRepository;

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
        List<CourseLesson> lessons = curriculumRepository.findByCourseLessonIdentityCourseIdOrderByCreateDateAsc(courseId);
        List<Instructor> instructors = instructorRepository.findByInstructorIdentityCourseId(courseId);
        List<Student> students = studentRepository.findByStudentIdentityCourseId(courseId);

        courseRepository.deleteById(courseId);
        curriculumRepository.deleteAll(lessons);
        instructorRepository.deleteAll(instructors);
        studentRepository.deleteAll(students);
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
        List<CourseLesson> lessons = curriculumRepository.findByCourseLessonIdentityCourseIdOrderByCreateDateAsc(courseId);

        List<Account> courseStudents = getStudentAccounts(studentList);
        List<Account> courseInstructors = getInstructorAccounts(instructorList);
        List<Lesson> courseLessons = getCourseLessons(lessons);

        List<Account> potentialStudents =  getStudentsNotInCourse(courseStudents);
        List<Account> potentialInstructors = getInstructorsNotInCourse(courseInstructors);

        CourseInformation info = new CourseInformation(course,courseLessons,courseStudents,courseInstructors,potentialStudents,potentialInstructors);
        return ResponseEntity.ok(info);
    }

    public List<Account> getStudentAccounts(List<Student> studentList) {
        return studentList.stream()
                    .map(student -> accountRepository.findByEmail(student.getStudentIdentity().getEmail()))
                    .collect(Collectors.toList());
    }

    public List<Account> getInstructorAccounts(List<Instructor> instructorList) {
        return instructorList.stream()
                    .map(instructor -> accountRepository.findByEmail(instructor.getInstructorIdentity().getEmail()))
                    .collect(Collectors.toList());
    }

    public List<Account> getInstructorsNotInCourse(List<Account> accounts) {
        String organization = accounts.get(0).getOrganizationEmail();     // a course will always have at least one instructor
        List<String> emails = accounts.stream().map(account -> account.getEmail()).collect(Collectors.toList());
        List<Account> accountsNotInCourse = accountRepository.findByOrganizationEmailAndRoleAndEmailNotIn(organization,"INSTRUCTOR",emails);
        return accountsNotInCourse;
    }

    public List<Account> getStudentsNotInCourse(List<Account> accounts) {
        List<Account> studentsNotInCourse = null;
        if (accounts.isEmpty()) {
            studentsNotInCourse = accountRepository.findByRole("STUDENT");
        }
        else {
            List<String> emails = accounts.stream().map(account -> account.getEmail()).collect(Collectors.toList());
            studentsNotInCourse = accountRepository.findByRoleAndEmailNotIn("STUDENT", emails);
        }
        return studentsNotInCourse;
    }

    public List<Lesson> getCourseLessons(List<CourseLesson> lessons) {
        return lessons.stream()
                    .map(lesson -> lessonRepository.findByLessonId(lesson.getCourseLessonIdentity().getLessonId()))
                    .collect(Collectors.toList());
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
    private List<Lesson> courseLessons;
    private List<Account> courseStudents;
    private List<Account> courseInstructors;
    private List<Account> potentialStudents;
    private List<Account> potentialInstructors;

    public CourseInformation(Course course, List<Lesson> courseLessons, List<Account> courseStudents, List<Account> courseInstructors, List<Account> potentialStudents, List<Account> potentialInstructors) {
        this.course = course;
        this.courseLessons = courseLessons;
        this.courseStudents = courseStudents;
        this.courseInstructors = courseInstructors;
        this.potentialStudents = potentialStudents;
        this.potentialInstructors = potentialInstructors;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Account> getCourseStudents() {
        return courseStudents;
    }

    public void setCourseStudents(List<Account> courseStudents) {
        this.courseStudents = courseStudents;
    }

    public List<Account> getCourseInstructors() {
        return courseInstructors;
    }

    public void setCourseInstructors(List<Account> courseInstructors) {
        this.courseInstructors = courseInstructors;
    }

    public List<Account> getPotentialStudents() {
        return potentialStudents;
    }

    public void setPotentialStudents(List<Account> potentialStudents) {
        this.potentialStudents = potentialStudents;
    }

    public List<Account> getPotentialInstructors() {
        return potentialInstructors;
    }

    public void setPotentialInstructors(List<Account> potentialInstructors) {
        this.potentialInstructors = potentialInstructors;
    }

    public List<Lesson> getCourseLessons() {
        return courseLessons;
    }

    public void setCourseLessons(List<Lesson> courseLessons) {
        this.courseLessons = courseLessons;
    }
}
