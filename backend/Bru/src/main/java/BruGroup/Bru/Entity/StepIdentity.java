package BruGroup.Bru.Entity;

import com.sun.xml.internal.xsom.impl.scd.Step;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class StepIdentity implements Serializable {

    @NotNull
    String lessonId;

    @NotNull
    int stepNumber;

    public StepIdentity(){}

    public StepIdentity(String lessonId, int stepNumber) {
        this.lessonId = lessonId;
        this.stepNumber = stepNumber;
    }

    public String getLessonId() {
        return lessonId;
    }

    public int getStepNumber() {
        return stepNumber;
    }

    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }

    public void setStepNumber(int stepNumber) {
        this.stepNumber = stepNumber;
    }
}
