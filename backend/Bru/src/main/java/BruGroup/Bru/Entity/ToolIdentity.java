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

    public ToolIdentity(String toolID, int stepID) {
        this.name = name;
        this.stepID = stepID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStepID() {
        return stepID;
    }

    public void setStepID(int stepID) {
        this.stepID = stepID;
    }
}
