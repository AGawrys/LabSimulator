package BruGroup.Bru.Entity;


import javax.persistence.*;

@Table(name = "Curriculum")
@Entity
public class Curriculum {

    @EmbeddedId
    private OrganizationIdentity organizationIdentity;

    public Curriculum() {

    }

    public Curriculum(OrganizationIdentity organizationIdentity) {
        this.organizationIdentity = organizationIdentity;
    }

    public OrganizationIdentity getOrganizationIdentity() {
        return organizationIdentity;
    }

    public void setOrganizationIdentity(OrganizationIdentity organizationIdentity) {
        this.organizationIdentity = organizationIdentity;
    }

    @Override
    public String toString() {
        return "Organization {" +
                "email = " + organizationIdentity.getEmail() +
                ", lessonId = " + organizationIdentity.getLessonId() + "}";
    }

}
