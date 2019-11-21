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
    private int published;  //0 is not published, 1 is published

    public Lesson() {

    }

    public Lesson(String lessonId, String instructorEmail, String organizationName, String name, int published) {
        this.lessonId = lessonId;
        this.instructorEmail = instructorEmail;
        this.organizationName = organizationName;
        this.name = name;
        this.published = published;
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
                ", name = " + name +
                ", published = " + published + "}";
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

    public int getPublished() {
        return published;
    }

    public void setPublished(int published) {
        this.published = published;
    }
}
