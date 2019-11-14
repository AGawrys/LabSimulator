package BruGroup.Bru.Entity;

import javax.persistence.Embeddable;
import javax.persistence.SecondaryTable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class OrganizationIdentity implements Serializable {

    @NotNull
    private String email;

    @NotNull
    private String lessonId;

    public OrganizationIdentity() {

    }

    public OrganizationIdentity(String email, String lessonId) {
        this.email = email;
        this.lessonId = lessonId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLessonId() {
        return lessonId;
    }

    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }
}
