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
    private double canvasHeight;
    private double canvasWidth;
    private int downloads;

    public Lesson() {

    }

    public Lesson(String name, String instructorEmail, double canvasHeight, double canvasWidth, int downloads) {
        this.name = name;
        this.instructorEmail = instructorEmail;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.downloads = downloads;
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

    public double getCanvasHeight() {
        return canvasHeight;
    }

    public void setCanvasHeight(double canvasHeight) {
        this.canvasHeight = canvasHeight;
    }

    public double getCanvasWidth() {
        return canvasWidth;
    }

    public void setCanvasWidth(double canvasWidth) {
        this.canvasWidth = canvasWidth;
    }

    public int getDownloads() {
        return downloads;
    }

    public void setDownloads(int downloads) {
        this.downloads = downloads;
    }
}
