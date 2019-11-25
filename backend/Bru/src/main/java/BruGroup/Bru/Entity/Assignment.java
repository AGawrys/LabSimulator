package BruGroup.Bru.Entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "Assignment")
@Entity
public class Assignment {
    @EmbeddedId
    private AssignmentIdentity assignmentIdentity;

    public Assignment() {

    }

    public Assignment(AssignmentIdentity assignmentIdentity) {
        this.assignmentIdentity = assignmentIdentity;
    }

    @Override
    public String toString() {
        return "Assignment {" +
                "email = " + assignmentIdentity.getEmail() +
                ", courseId = " + assignmentIdentity.getLessonId();
    }
}
