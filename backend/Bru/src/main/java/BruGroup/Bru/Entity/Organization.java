package BruGroup.Bru.Entity;


import javax.persistence.*;

@Table(name = "Organization")
@Entity
public class Organization {

    @EmbeddedId
    private OrganizationIdentity organizationIdentity;

    public Organization() {

    }

    public Organization(OrganizationIdentity organizationIdentity) {
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
