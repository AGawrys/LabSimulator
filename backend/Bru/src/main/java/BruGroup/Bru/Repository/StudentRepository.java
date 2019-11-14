package BruGroup.Bru.Repository;

import BruGroup.Bru.Entity.Student;
import BruGroup.Bru.Entity.StudentIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, StudentIdentity> {

    List<Student> findByStudentIdentityEmail(@PathVariable String email);
    List<Student> findByStudentIdentityCourseId(@PathVariable String courseId);
    Student findByStudentIdentity(StudentIdentity studentIdentity);
    /*
    List<Student> findByEmailContaining(@PathVariable String email);
    List<Student> findByCourseIdContaining(@PathVariable String courseId);
    Student findByEmailContainingAndCourseIdContaining(String email, String courseId);
     */
}
