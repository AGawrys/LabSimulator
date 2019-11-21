package BruGroup.Bru.Entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "Assignment")
@Entity
public class Assignment {
    @EmbeddedId
    private AssignmentIdentity assignmentIdentity;
    private int completed;  //0 not completed, 1 completed

    public Assignment() {

    }

    public Assignment(AssignmentIdentity assignmentIdentity, int completed) {
        this.assignmentIdentity = assignmentIdentity;
        this.completed = completed;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return "Instructor {" +
                "email = " + assignmentIdentity.getEmail() +
                ", courseId = " + assignmentIdentity.getLessonId() +
                ", completed = " + completed + "}";
    }
}
