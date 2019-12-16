package BruGroup.Bru.Entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Table (name = "CourseLesson")
@Entity
public class CourseLesson {
    @EmbeddedId
    private CourseLessonIdentity courseLessonIdentity;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date")
    private Date createDate;

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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
