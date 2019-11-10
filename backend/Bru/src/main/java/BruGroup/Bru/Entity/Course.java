package BruGroup.Bru.Entity;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Course {

    @Id
    private int id;
    private String name;
    private String instructorEmail;

    public Course () {

    }
    public Course(String Name, String instructorEmail){
        this.name = Name;
        this.instructorEmail = instructorEmail;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstructor() {
        return instructorEmail;
    }

    public void setInstructor(String email) {
        this.instructorEmail = email;
    }

    @Override
    public String toString() {
        return "User {" +
                "Course ID = " + id +
                ", Name = " + name
                + "}";
    }
}
