package BruGroup.Bru.Entity;


import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Table(name = "Organization")
@Entity
public class Organization {

    @Id
    private int lessonId;
    private String email;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date")
    private Date createDate;

    public Organization() {

    }

    public Organization(int lessonId, String email) {
        this.lessonId = lessonId;
        this.email = email;
    }

    @Override
    public String toString() {
        return "Organization {" +
                "lessonId = " +  lessonId +
                ", email = " + email + "}";
    }

    public void setLessonId(int lessonId) {
        this.lessonId = lessonId;
    }

    public int getLessonId() {
        return lessonId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
