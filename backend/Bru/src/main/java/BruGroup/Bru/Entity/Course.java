package BruGroup.Bru.Entity;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Course {

    @Id
    private String courseId;
    private String name;

    public Course () {

    }

    public Course(String name){
        this.name = name;
    }

    public String getCourseId() { return courseId; }

    public void setCourseId(String courseId) { this.courseId = courseId; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User {" +
                "Course Access Code = " + courseId +
                ", Name = " + name
                + "}";
    }
}
