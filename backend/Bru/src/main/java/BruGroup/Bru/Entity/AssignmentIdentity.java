package BruGroup.Bru.Entity;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class AssignmentIdentity implements Serializable {

    @NotNull
    private String email;

    @NotNull
    private int lessonId;

    @NotNull
    private String courseId;

    public AssignmentIdentity() {

    }

    public AssignmentIdentity(String email, String courseId, int lessonId) {
        this.email = email;
        this.courseId = courseId;
        this.lessonId = lessonId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getLessonId() {
        return lessonId;
    }

    public void setLessonId(int lessonId) {
        this.lessonId = lessonId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }
}
