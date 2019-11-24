package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Tool;
import BruGroup.Bru.Entity.ToolIdentity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToolRepository extends JpaRepository<Tool, ToolIdentity> {
    List<Tool> findByToolIdentityLessonIdAndToolIdentityStepNumber(int lessonId, int stepNumber);
    List<Tool> findByToolIdentityLessonId(int lessonId);
}
