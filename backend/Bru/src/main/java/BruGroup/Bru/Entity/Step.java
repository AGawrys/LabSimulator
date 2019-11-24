package BruGroup.Bru.Entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "Step")
@Entity
public class Step {

    @EmbeddedId
    private StepIdentity stepIdentity;
    private String name;
    private String description;
    private String actionType;
    private int source;
    private int target;
    private int actionMeasurement;

    public Step(){

    }

    public Step(StepIdentity stepIdentity, String name, String description, String actionType, int source, int target, int actionMeasurement) {
        this.stepIdentity = stepIdentity;
        this.name = name;
        this.description = description;
        this.actionType = actionType;
        this.source = source;
        this.target = target;
        this.actionMeasurement = actionMeasurement;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public int getSource() {
        return source;
    }

    public void setSource(int source) {
        this.source = source;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public StepIdentity getStepIdentity() {
        return stepIdentity;
    }

    @Override
    public String toString() {
        return "Step {" +
                "email = " + stepIdentity.getLessonId() +
                ", stepNumber = " + stepIdentity.getStepNumber() +
                ", name = " + name +
                ", description = " + description +
                ", actionType = " + actionType +
                ", source = " + source +
                ", target = " + target +
                ", actionMeasurement = " + actionMeasurement + "}";
    }
}
