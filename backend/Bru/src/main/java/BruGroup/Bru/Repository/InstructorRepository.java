package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Instructor;
import BruGroup.Bru.Entity.InstructorIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, InstructorIdentity> {

}
