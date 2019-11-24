package BruGroup.Bru.Controller;

import BruGroup.Bru.Entity.Assignment;
import BruGroup.Bru.Entity.AssignmentIdentity;
import BruGroup.Bru.Repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AssignmentController {

    @Autowired
    AssignmentRepository assignmentRepository;

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
        Assignment assignment = new Assignment(assignmentIdentity, 0);
        assignmentRepository.save(assignment);
        return ResponseEntity.ok(null);
    }

    @GetMapping(path = "/getAssignmentLessonId/{lessonId}")
    @CrossOrigin(origins = "*")
    public List<Assignment> getAssignmentLessonId(@PathVariable int lessonId) {
        List<Assignment> assignmentList = assignmentRepository.findByAssignmentIdentityLessonId(lessonId);
        return assignmentList;
    }

    @PostMapping(path = "/updateAssignment")
    @CrossOrigin(origins = "*")
    public ResponseEntity updateAssignment (@RequestBody AssignmentIdentity assignmentIdentity) {
        Assignment assignment1 = assignmentRepository.findByAssignmentIdentity(assignmentIdentity);
        assignment1.setCompleted(1);
        assignmentRepository.save(assignment1);
        return ResponseEntity.ok(null);
    }
}
