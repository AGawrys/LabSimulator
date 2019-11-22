package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Lesson;
import BruGroup.Bru.Entity.Organization;
import BruGroup.Bru.Repository.AccountRepository;
import BruGroup.Bru.Repository.LessonRepository;
import BruGroup.Bru.Repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LessonController {

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping(path = "/allLessons")
    @CrossOrigin(origins = "*")
    public List<Lesson> allLessons() {
        return lessonRepository.findAll();
    }

    @PostMapping(path = "/addLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity addLesson(@RequestBody Lesson lesson) {
        lessonRepository.save(lesson);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/deleteLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteLesson(@RequestBody Lesson lesson) {
        lessonRepository.delete(lesson);
        return ResponseEntity.ok(null);
    }

    @GetMapping(path = "/getInstructorLessons/{instructorEmail}")
    @CrossOrigin(origins = "*")
    public List<Lesson> getInstructorLessons(@PathVariable String instructorEmail) {
        List<Lesson> lessonList = lessonRepository.findByInstructorEmail(instructorEmail);
        return lessonList;
    }

    @GetMapping(path = "/getLesson/{lessonId}")
    @CrossOrigin(origins = "*")
    public Lesson getLesson(@PathVariable String lessonId) {
        Lesson lesson = lessonRepository.findByLessonId(lessonId);
        return lesson;
    }

    @PostMapping(path = "/updateLessonName")
    @CrossOrigin(origins = "*")
    public ResponseEntity updateLessonName(@RequestBody Lesson lesson) {
        Lesson lessonId = lessonRepository.findByLessonId(lesson.getLessonId());
        lessonId.setName(lesson.getName());
        lessonRepository.save(lessonId);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/publishLab/{lessonId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity publishLab(@PathVariable String lessonId) {
        Lesson lesson = lessonRepository.findByLessonId(lessonId);
        lesson.setPublished(1);
        lessonRepository.save(lesson);

        String orgEmail = accountRepository.findByEmail(lesson.getInstructorEmail()).getOrganizationEmail();
        Organization organization = new Organization(lessonId, orgEmail);
        organizationRepository.save(organization);

        return ResponseEntity.ok(null);
    }


}