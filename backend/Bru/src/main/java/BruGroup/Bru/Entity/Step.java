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
    private int timer;

    public Step(){

    }

    public Step(StepIdentity stepIdentity, String name, String description, String actionType, int source, int target, int actionMeasurement, int timer) {
        this.stepIdentity = stepIdentity;
        this.name = name;
        this.description = description;
        this.actionType = actionType;
        this.source = source;
        this.target = target;
        this.actionMeasurement = actionMeasurement;
        this.timer = timer;
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

    public int getActionMeasurement() { return actionMeasurement;}

    public void setActionMeasurement() {this.actionMeasurement = actionMeasurement;}

    public Step clone(int lessonId) {
        StepIdentity clonedStepIdentity = this.stepIdentity.clone(lessonId);
        return new Step(
                clonedStepIdentity,
                this.getName(),
                this.getDescription(),
                this.getActionType(),
                this.getSource(),
                this.getTarget(),
                this.getActionMeasurement(),
                this.getTimer());
    }

    public boolean isComplete() {
        if (actionType == null || actionMeasurement == 0) {
            return false;
        }
        if (timer == 0 && !actionType.equals("Pour")) {
            return false;
        }
        return isActionSet();
    }

    public boolean isActionSet() {

        if (actionType.equals("Pour") || actionType.equals("Drag") || actionType.equals("Stir")) {
            return source != -1 && target != -1;
        }
        return source != -1;
    }

    public boolean isPourComplete() {
        return this.source != -1 && this.target != -1;
    }

    public boolean isStirComplete() {
        return this.timer != 0 && (this.source != -1 && this.target != -1);
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
                ", actionMeasurement = " + actionMeasurement +
                ", timer = " + timer + "}";
    }

    public int getTimer() {
        return timer;
    }

    public void setTimer(int timer) {
        this.timer = timer;
    }
}
