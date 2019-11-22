package BruGroup.Bru.Entity;


import javax.persistence.*;

@Table(name = "Organization")
@Entity
public class Organization {

    @Id
    private String lessonId;
    private String email;

    public Organization() {

    }

    public Organization(String lessonId, String email) {
        this.lessonId = lessonId;
        this.email = email;
    }

    @Override
    public String toString() {
        return "Organization {" +
                "lessonId = " +  lessonId +
                ", email = " + email + "}";
    }

    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }

    public String getLessonId() {
        return lessonId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
