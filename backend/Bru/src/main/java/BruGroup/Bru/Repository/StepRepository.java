package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Step;
import BruGroup.Bru.Entity.StepIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface StepRepository extends JpaRepository<Step, StepIdentity> {
    List<Step> findByStepIdentityLessonId(@PathVariable String lessonId);
    Step findByStepIdentity(StepIdentity stepIdentity);
}
