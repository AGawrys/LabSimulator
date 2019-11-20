package BruGroup.Bru.Entity;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Embeddable
public class ToolIdentity implements Serializable {

    @NotNull
    private String name;

    @NotNull
    private int stepNumber;

    @NotNull
    private int lessonId;

    public ToolIdentity() {

    }

    public ToolIdentity(String name, int stepNumber, int lessonId) {
        this.name = name;
        this.stepNumber = stepNumber;
        this.lessonId = lessonId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStepNumber() {
        return stepNumber;
    }

    public void setStepNumber(int stepID) {
        this.stepNumber = stepID;
    }

    public int getLessonId() {
        return lessonId;
    }

    public void setLessonId(int lessonId) {
        this.lessonId = lessonId;
    }
}
