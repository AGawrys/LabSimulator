package BruGroup.Bru.Entity;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class InstructorIdentity implements Serializable {

    @NotNull
    private String email;

    @NotNull
    private String courseId;

    public InstructorIdentity() {

    }

    public InstructorIdentity(String email, String courseId) {
        this.email = email;
        this.courseId = courseId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }
}
