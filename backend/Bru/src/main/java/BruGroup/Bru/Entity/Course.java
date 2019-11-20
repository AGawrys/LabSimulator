package BruGroup.Bru.Entity;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Course {

    @Id
    private String id;
    private String name;

    public Course () {

    }
    public Course(String name){
        this.name = name;
    }

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User {" +
                "Course Access Code = " + id +
                ", Name = " + name
                + "}";
    }
}
