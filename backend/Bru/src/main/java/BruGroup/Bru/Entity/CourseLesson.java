package BruGroup.Bru.Entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table (name = "CourseLesson")
@Entity
public class CourseLesson {
    @EmbeddedId
    private CourseLessonIdentity courseLessonIdentity;

    public CourseLesson(){}

    public CourseLesson(CourseLessonIdentity courseLessonIdentity) {
        this.courseLessonIdentity = courseLessonIdentity;
    }


    public CourseLessonIdentity getCourseLessonIdentity() {
        return courseLessonIdentity;
    }

    public void setCourseLessonIdentity(CourseLessonIdentity courseLessonIdentity) {
        this.courseLessonIdentity = courseLessonIdentity;
    }

    @Override
    public String toString() {
        return "CourseLesson {" +
                "courseId = " + courseLessonIdentity.getCourseId() +
                ", lessonId = " + courseLessonIdentity.getLessonId() + "}";
    }
}
