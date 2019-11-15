package BruGroup.Bru.Entity;

import javax.persistence.*;

@Table(name = "Lesson")
@Entity
public class Lesson {

    @EmbeddedId
    private LessonIdentity lessonIdentity;
    private String organizationName;
    private String name;

    public Lesson() {

    }

    public Lesson(LessonIdentity lessonIdentity, String organizationName, String name) {
        this.lessonIdentity = lessonIdentity;
        this.organizationName = organizationName;
        this.name = name;
    }

    public LessonIdentity getLessonIdentity() {
        return lessonIdentity;
    }

    public void setLessonIdentity(LessonIdentity lessonIdentity) {
        this.lessonIdentity = lessonIdentity;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Lesson {" +
                "instructorEmail = " + lessonIdentity.getInstructorEmail() +
                ", lessonId = " + lessonIdentity.getLessonId() +
                ", organizationName = " + organizationName +
                ", name = " + name + "}";
    }
}
