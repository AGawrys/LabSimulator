package BruGroup.Bru.Entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "Attempt")
@Entity
public class Attempt {
    @EmbeddedId
    private AttemptIdentity attemptIdentity;
    private int numAttempts;

    public Attempt() {

    }

    public Attempt(AttemptIdentity attemptIdentity, int numAttempts) {
        this.attemptIdentity = attemptIdentity;
        this.numAttempts = numAttempts;
    }

    public AttemptIdentity getAttemptIdentity() {
        return attemptIdentity;
    }

    public void setAttemptIdentity(AttemptIdentity attemptIdentity) {
        this.attemptIdentity = attemptIdentity;
    }

    public int getNumAttempts() {
        return numAttempts;
    }

    public void setNumAttempts(int numAttempts) {
        this.numAttempts = numAttempts;
    }

    @Override
    public String toString() {
        return "Attempt {" +
                "email = " + attemptIdentity.getEmail() +
                ", courseId = " + attemptIdentity.getCourseId();
    }
}
