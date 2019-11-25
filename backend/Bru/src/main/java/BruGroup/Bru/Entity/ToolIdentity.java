package BruGroup.Bru.Entity;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Embeddable
public class ToolIdentity implements Serializable {

    @NotNull
    private int layer;

    @NotNull
    private int stepNumber;

    @NotNull
    private int lessonId;

    public ToolIdentity() {

    }

    public ToolIdentity(int layer, int stepNumber, int lessonId) {
        this.layer = layer;
        this.stepNumber = stepNumber;
        this.lessonId = lessonId;
    }

    public int getLayer() {
        return layer;
    }

    public void setLayer(int layer) {
        this.layer = layer;
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
