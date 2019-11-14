package BruGroup.Bru.Entity;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Table(name = "Student")
@Entity
public class Student {

    @Id
    @Size(max = 50)
    private String email;
    private String courseId;

    public Student() {

    }

    public Student(String email, String courseId) {
        this.email = email;
        this.courseId = courseId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    @Override
    public String toString() {
        return "Student {" +
                "email = " + email +
                ", courseId = " + courseId + "}";
    }
}
