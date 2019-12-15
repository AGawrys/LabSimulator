package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Attempt;
import BruGroup.Bru.Entity.AttemptIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt, AttemptIdentity> {
    Attempt findByAttemptIdentity(AttemptIdentity attemptIdentity);
    List<Attempt> findByAttemptIdentityLessonId(@PathVariable int lessonId);
    List<Attempt> findByAttemptIdentityEmail(@PathVariable String email);
}
