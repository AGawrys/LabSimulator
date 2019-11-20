package BruGroup.Bru.Entity;

import javax.persistence.*;

@Table(name = "Lesson")
@Entity
public class Lesson {

    @Id
    private String lessonId;
    private String instructorEmail;
    private String organizationName;
    private String name;

    public Lesson() {

    }

    public Lesson(String lessonId, String instructorEmail, String organizationName, String name) {
        this.lessonId = lessonId;
        this.instructorEmail = instructorEmail;
        this.organizationName = organizationName;
        this.name = name;
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
                "instructorEmail = " + instructorEmail +
                ", lessonId = " +  lessonId +
                ", organizationName = " + organizationName +
                ", name = " + name + "}";
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
