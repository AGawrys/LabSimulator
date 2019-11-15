package BruGroup.Bru.Entity;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class LessonIdentity implements Serializable {

    @NotNull
    private String instructorEmail;

    @NotNull
    private String lessonId;

    public LessonIdentity() {

    }

    public LessonIdentity(String instructorEmail, String lessonId) {
        this.instructorEmail = instructorEmail;
        this.lessonId = lessonId;
    }

    public String getInstructorEmail() {
        return instructorEmail;
    }

    public void setInstructorEmail(String instructorEmail) {
        this.instructorEmail = instructorEmail;
    }

    public String getLessonId() {
        return lessonId;
    }

    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }
}
