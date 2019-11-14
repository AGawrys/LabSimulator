package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Instructor;
import BruGroup.Bru.Entity.InstructorIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, InstructorIdentity> {
    List<Instructor> findByInstructorIdentityEmail(@PathVariable String email);
    List<Instructor> findByInstructorIdentityCourseId(@PathVariable String courseId);
    Instructor findByInstructorIdentity(InstructorIdentity instructorIdentity);
}
