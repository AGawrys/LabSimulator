package BruGroup.Bru.Entity;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Embeddable
public class StudentIdentity implements Serializable {

    @NotNull
    @Size(max = 50)
    private String email;

    @NotNull
    @Size(max = 20)
    private String courseId;

    public StudentIdentity(){

    }

    public StudentIdentity(String email, String courseId) {
        this.email = email;
        this.courseId = courseId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
