package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.*;
import BruGroup.Bru.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.constraints.Null;
import javax.xml.ws.Response;
import java.util.*;
import java.util.stream.Collectors;



@RestController
public class LessonController {

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    CourseLessonRepository curriculumRepository;

    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    ToolRepository toolRepository;

    @Autowired
    StepRepository stepRepository;

    @Autowired
    AssignmentRepository assignmentRepository;

    @Autowired
    AttemptRepository attemptRepository;

    private static final double DEFAULT_CANVAS_SIZE = 1000;

    @GetMapping(path = "/allLessons")
    @CrossOrigin(origins = "*")
    public List<Lesson> allLessons() {
        return lessonRepository.findAll();
    }

    @PostMapping(path = "/addLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity addLesson(@RequestBody Lesson lesson) {
        lesson.setCanvasHeight(DEFAULT_CANVAS_SIZE);
        lesson.setCanvasWidth(DEFAULT_CANVAS_SIZE);
        lessonRepository.save(lesson);
        return ResponseEntity.ok(lesson.getLessonId());
    }

    @PostMapping(path = "/deleteLesson/{lessonId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteLesson(@PathVariable int lessonId) {
        Lesson lesson = lessonRepository.findByLessonId(lessonId);
        if (lesson == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        List<CourseLesson> courseLessons = curriculumRepository.findByCourseLessonIdentityLessonId(lessonId);
        List<Assignment> assignments = assignmentRepository.findByAssignmentIdentityLessonId(lessonId);
        List<Step> steps = stepRepository.findByStepIdentityLessonId(lessonId);
        List<Tool> tools = toolRepository.findByToolIdentityLessonId(lessonId);

        Organization publishedLesson = organizationRepository.findByLessonId(lessonId);
        if(publishedLesson != null) {
            organizationRepository.delete(publishedLesson);
        }
        toolRepository.deleteAll(tools);
        curriculumRepository.deleteAll(courseLessons);
        assignmentRepository.deleteAll(assignments);
        stepRepository.deleteAll(steps);
        lessonRepository.delete(lesson);

        return ResponseEntity.ok(null);
    }

    @GetMapping(path = "/getInstructorLessons/{instructorEmail}")
    @CrossOrigin(origins = "*")
    public List<Lesson> getInstructorLessons(@PathVariable String instructorEmail) {
        List<Lesson> lessonList = lessonRepository.findByInstructorEmail(instructorEmail);
        return lessonList;
    }

    @PostMapping(path = "/getPotentialLessons")
    @CrossOrigin(origins ="*")
    public ResponseEntity getPotentialLessons(@RequestBody PotentialLessonParameters params) {
        List<Lesson> instructorLessons = lessonRepository.findByInstructorEmail(params.getInstructorEmail());
        HashSet<Integer> courseLessonIds = getCourseLessonIds(params.getCourseId());
        List<Lesson> potentialLessons = instructorLessons
                .stream()
                .filter(lesson -> !courseLessonIds.contains(lesson.getLessonId()) && organizationRepository.findByLessonId(lesson.getLessonId()) != null)
                .collect(Collectors.toList());
        return ResponseEntity.ok(potentialLessons);
    }

    @GetMapping(path = "/getLesson/{lessonId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity getLesson(@PathVariable int lessonId) {
        Lesson lesson = lessonRepository.findByLessonId(lessonId);
        if (lesson == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        boolean isPublished = organizationRepository.findByLessonId(lessonId) != null;
        List<Step> stepList = stepRepository.findByStepIdentityLessonId(lessonId);
        List<StepInformation> stepInformationList = new ArrayList<>();

        for (Step step : stepList) {
            StepInformation stepInformation = new StepInformation();
            stepInformation.setStep(step);
            List<Tool> toolList = toolRepository.findByToolIdentityLessonIdAndToolIdentityStepNumber(lessonId, step.getStepIdentity().getStepNumber());
            stepInformation.setToolList(toolList);
            stepInformationList.add(stepInformation);
        }

        LessonInformation lessonInformation = new LessonInformation(lesson,stepInformationList, isPublished);
        return ResponseEntity.ok(lessonInformation);
    }

    @GetMapping(path ="/searchLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity searchLessons(@RequestParam(value="name") String name,
                                        @RequestParam(value="email") String email) {
        List<Lesson> lessons = lessonRepository.findByNameContainingIgnoreCaseAndInstructorEmailNot(name,email);
        List<Lesson> publishedLessons = lessons
                .stream()
                .filter(lesson -> organizationRepository.findByLessonId(lesson.getLessonId()) != null)
                .collect(Collectors.toList());
        List<SearchResult> searchResults = publishedLessons
                .stream()
                .map(lesson -> toSearchResult(lesson))
                .collect(Collectors.toList());
        return ResponseEntity.ok(searchResults);
    }

    @PostMapping(path = "/canStudentComplete")
    @CrossOrigin(origins = "*")
    public ResponseEntity canStudentComplete(@RequestBody AssignmentIdentity identity) {
        List<CourseLesson> curriculum = curriculumRepository.findByCourseLessonIdentityCourseIdOrderByCreateDateAsc(identity.getCourseId());
        boolean isCompleted = assignmentRepository.existsById(identity);
        if (isCompleted) {
            return ResponseEntity.ok(isCompleted);
        }

        for (CourseLesson courseLesson : curriculum) {
            identity = new AssignmentIdentity(identity.getEmail(),identity.getCourseId(), courseLesson.getCourseLessonIdentity().getLessonId());
            if (!assignmentRepository.existsById(identity)) { //if assignment has not been completed by student
                ResponseEntity canStudentComplete = identity.getLessonId() == identity.getLessonId()
                        ? ResponseEntity.ok(false)
                        : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                return canStudentComplete;
            }
        }
        return ResponseEntity.ok(curriculum);
    }

    @PostMapping(path = "/cloneLesson")
    @CrossOrigin(origins = "*")
    public ResponseEntity cloneLesson(@RequestBody AccountLessonParams params) {
        Lesson existingLesson = lessonRepository.findByLessonId(params.getLessonId());
        String clonedLessonName = "Copy of " + existingLesson.getName();
        if (!params.getEmail().equals(existingLesson.getInstructorEmail())) {
            incrementDownloads(existingLesson);
        }

        Lesson clonedLesson = new Lesson(
                clonedLessonName,
                params.getEmail(),
                existingLesson.getCanvasHeight(),
                existingLesson.getCanvasWidth(),
                0
        );
        lessonRepository.save(clonedLesson);

        List<Step> steps = stepRepository.findByStepIdentityLessonId(params.getLessonId());
        List<Step> clonedSteps = steps
                .stream()
                .map(step -> step.clone(clonedLesson.getLessonId()))
                .collect(Collectors.toList());

        List<Tool> tools  = toolRepository.findByToolIdentityLessonId(existingLesson.getLessonId());
        List<Tool> clonedTools = tools
                .stream()
                .map(tool -> tool.clone(clonedLesson.getLessonId()))
                .collect(Collectors.toList());

        stepRepository.saveAll(clonedSteps);
        toolRepository.saveAll(clonedTools);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/updateLessonName")        //SAVE
    @CrossOrigin(origins = "*")
    public ResponseEntity updateLessonName(@RequestBody LessonInformation lessonInformation) {
        System.out.print(lessonInformation);
        Lesson lesson = lessonInformation.getLesson();
        lessonRepository.save(lesson);
        saveStepTable(lessonInformation.getStepInformation(), lesson.getLessonId());
        return ResponseEntity.ok(null);
    }

    @Transactional
    public void incrementDownloads(Lesson lesson) {
        lesson.setDownloads(lesson.getDownloads() + 1);
        lessonRepository.save(lesson);
    }

    public HashSet<Integer> getCourseLessonIds(String courseId) {
        HashSet<Integer> courseLessonIds = new HashSet<>();
        List<CourseLesson> courseLessons = curriculumRepository.findByCourseLessonIdentityCourseIdOrderByCreateDateAsc(courseId);
        for (CourseLesson lesson: courseLessons) {
            courseLessonIds.add(lesson.getCourseLessonIdentity().getLessonId());
        }
        return courseLessonIds;
    }

    public void saveToolTable (List<Tool> toolList) {
        for (Tool tool: toolList) {
            toolRepository.save(tool);
        }
    }

    public void saveStepTable (List <StepInformation> stepInformationList, int lessonId) {
        List<Step> deleteStepList = stepRepository.findByStepIdentityLessonId(lessonId);
        for (Step step: deleteStepList) {
            stepRepository.delete(step);
        }

        List<Tool> deleteToolList = toolRepository.findByToolIdentityLessonId(lessonId);
        for (Tool tool: deleteToolList) {
            toolRepository.delete(tool);
        }

        for (StepInformation stepInformation: stepInformationList) {
            Step step = stepInformation.getStep();
            stepRepository.save(step);
            saveToolTable(stepInformation.getToolList());
        }
    }

    public SearchResult toSearchResult(Lesson lesson) {
        Date publishDate = organizationRepository.findByLessonId(lesson.getLessonId()).getCreateDate();
        List <Attempt> attempts = attemptRepository.findByAttemptIdentityLessonId(lesson.getLessonId());
        List <Assignment> completions = assignmentRepository.findByAssignmentIdentityLessonId(lesson.getLessonId());

        int totalAttempts = attempts
                .stream()
                .reduce(0, (partialAttemptNumber, attempt2) -> partialAttemptNumber + attempt2.getNumAttempts(), Integer::sum);
        int totalCompletions = completions.size();

        LessonStatistic statistic = new LessonStatistic(totalAttempts, totalCompletions);
        return new SearchResult(lesson, publishDate, statistic);
    }
}

class PotentialLessonParameters {
    private String courseId;
    private String instructorEmail;

    public PotentialLessonParameters() {

    }

    public PotentialLessonParameters(String courseId, String instructorEmail) {
        this.courseId = courseId;
        this.instructorEmail = instructorEmail;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getInstructorEmail() {
        return instructorEmail;
    }

    public void setInstructorEmail(String instructorEmail) {
        this.instructorEmail = instructorEmail;
    }
}

class AccountLessonParams {
    private int lessonId;
    private String email;

    public AccountLessonParams() {

    }

    public AccountLessonParams(int lessonId, String email) {
        this.lessonId = lessonId;
        this.email = email;
    }

    public int getLessonId() {
        return lessonId;
    }

    public void setLessonId(int lessonId) {
        this.lessonId = lessonId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

class LessonInformation {

    private Lesson lesson;
    private boolean isPublished;
    private List<StepInformation> stepInformation;

    public LessonInformation(){}

    public LessonInformation(Lesson lesson, List<StepInformation> stepInformation, boolean isPublished) {
        this.lesson = lesson;
        this.stepInformation = stepInformation;
        this.isPublished = isPublished;
    }

    public boolean isPublished() {
        return isPublished;
    }

    public void setPublished(boolean published) {
        isPublished = published;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public List<StepInformation> getStepInformation() {
        return stepInformation;
    }

    public void setStepInformation(List<StepInformation> stepInformation) {
        this.stepInformation = stepInformation;
    }
}

class StepInformation {
    private Step step;
    private List<Tool> toolList;

    public StepInformation() {

    }

    public StepInformation (Step step, List<Tool> toolList) {
        this.step = step;
        this.toolList = toolList;
    }

    public Step getStep() {
        return step;
    }

    public void setStep(Step step) {
        this.step = step;
    }

    public List<Tool> getToolList() {
        return toolList;
    }

    public void setToolList(List<Tool> toolList) {
        this.toolList = toolList;
    }

    public List<Tool> addToolList (Tool tool) {
        this.toolList.add(tool);
        return toolList;
    }
}

class SearchResult {
    private Lesson lesson;
    private Date datePublished;
    private LessonStatistic statistic;

    public SearchResult() {

    }

    public SearchResult(Lesson lesson, Date datePublished, LessonStatistic statistic) {
        this.lesson = lesson;
        this.datePublished = datePublished;
        this.statistic = statistic;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public Date getDatePublished() {
        return datePublished;
    }

    public void setDatePublished(Date datePublished) {
        this.datePublished = datePublished;
    }

    public LessonStatistic getStatistic() {
        return statistic;
    }

    public void setStatistic(LessonStatistic statistic) {
        this.statistic = statistic;
    }
}

class LessonStatistic {
    private int numAttempts;
    private int numCompleted;

    public LessonStatistic() {}

    public LessonStatistic(int numAttempts, int numCompleted) {
        this.numAttempts = numAttempts;
        this.numCompleted = numCompleted;
    }

    public int getNumAttempts() {
        return numAttempts;
    }

    public void setNumAttempts(int numAttempts) {
        this.numAttempts = numAttempts;
    }

    public int getNumCompleted() {
        return numCompleted;
    }

    public void setNumCompleted(int numCompleted) {
        this.numCompleted = numCompleted;
    }
}