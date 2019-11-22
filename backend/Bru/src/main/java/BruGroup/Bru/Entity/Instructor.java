package BruGroup.Bru.Entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "Instructor")
@Entity
public class Instructor {

    @EmbeddedId
    private InstructorIdentity instructorIdentity;

    public Instructor(){

    }

    public Instructor(InstructorIdentity instructorIdentity) {
        this.instructorIdentity = instructorIdentity;
    }

    public InstructorIdentity getInstructorIdentity() {
        return instructorIdentity;
    }

    public void setInstructorIdentity(InstructorIdentity instructorIdentity) {
        this.instructorIdentity = instructorIdentity;
    }

    @Override
    public String toString() {
        return "Instructor {" +
                "email = " + instructorIdentity.getEmail() +
                ", courseId = " + instructorIdentity.getCourseId() + "}";
    }
}
