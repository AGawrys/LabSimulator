package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Step;
import BruGroup.Bru.Repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StepController {

    @Autowired
    StepRepository stepRepository;

    @GetMapping(path = "/allSteps")
    @CrossOrigin(origins = "*")
    public List<Step> allSteps() {
        return stepRepository.findAll();
    }

    @PostMapping(path = "/addStep")
    @CrossOrigin(origins = "*")
    public ResponseEntity addStep (@RequestBody Step step) {
        stepRepository.save(step);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/deleteStep")
    @CrossOrigin(origins = "*")
    public ResponseEntity deleteStep (@RequestBody Step step) {
        stepRepository.delete(step);
        return ResponseEntity.ok(null);
    }

    @PostMapping(path = "/lessonSteps/{lessonId}")
    @CrossOrigin(origins = "*")
    public List<Step> lessonSteps (@PathVariable String lessonId) {
        List<Step> stepList = stepRepository.findByStepIdentityLessonId(lessonId);
        return stepList;
    }

    @PostMapping(path = "/updateStep")
    @CrossOrigin(origins = "*")
    public ResponseEntity updateStep(@RequestBody Step step) {
        Step step1 = stepRepository.findByStepIdentity(step.getStepIdentity());
        step1.setActionType(step.getActionType());
        step1.setDescription(step.getDescription());
        step1.setName(step.getName());
        step1.setSource(step.getSource());
        step1.setTarget(step.getTarget());
        stepRepository.save(step1);
        return ResponseEntity.ok(null);
    }
}
