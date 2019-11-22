package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Assignment;
import BruGroup.Bru.Entity.AssignmentIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, AssignmentIdentity> {
    Assignment findByAssignmentIdentity(AssignmentIdentity assignmentIdentity);
    List<Assignment> findByAssignmentIdentityLessonId(@PathVariable int lessonId);
}
