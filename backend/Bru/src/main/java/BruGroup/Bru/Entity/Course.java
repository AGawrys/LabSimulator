package BruGroup.Bru.Entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Random;

@Entity
public class Course {

    final static int COURSE_CODE_LENGTH = 5;
    final static String COURSE_CODE_OPTIONS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

    @Id
    private String courseId;

    @NotNull
    private String name;
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Course () {

    }

    public Course(String courseId, String name, String description){
        this.courseId = courseId;
        this.name = name;
        this.description = description;
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

    public static String generateCourseID() {
        StringBuilder courseCode = new StringBuilder(COURSE_CODE_LENGTH);
        Random random = new Random();
        int index = 0;

        for (int i = 0; i < COURSE_CODE_LENGTH; i++) {
            index = random.nextInt(COURSE_CODE_OPTIONS.length());
            courseCode.append(COURSE_CODE_OPTIONS.charAt(index));
        }
        return courseCode.toString();
    }
}
