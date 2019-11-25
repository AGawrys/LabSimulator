package BruGroup.Bru.Entity;

import javax.persistence.*;

@Table(name = "Lesson")
@Entity
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int lessonId;
    private String instructorEmail;
    private String name;

    public Lesson() {

    }

    public Lesson(String name, String instructorEmail) {
        this.name = name;
        this.instructorEmail = instructorEmail;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getInstructorEmail() {
        return instructorEmail;
    }

    public void setInstructorEmail(String instructorEmail) {
        this.instructorEmail = instructorEmail;
    }

    public int getLessonId() {
        return lessonId;
    }

    public void setLessonId(int lessonId) {
        this.lessonId = lessonId;
    }

}
