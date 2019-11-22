package BruGroup.Bru.Entity;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class CourseLessonIdentity implements Serializable {

    @NotNull
    private String courseId;

    @NotNull
    private int lessonId;

    public CourseLessonIdentity() {

    }

    public CourseLessonIdentity(String courseId, int lessonId) {
        this.courseId = courseId;
        this.lessonId = lessonId;
    }


    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public int getLessonId() {
        return lessonId;
    }

    public void setLessonId(int lessonId) {
        this.lessonId = lessonId;
    }
}
