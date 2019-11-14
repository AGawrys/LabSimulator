package BruGroup.Bru.Entity;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Table(name = "Account")
@Entity
public class Account {

    @Id
    @Size(max = 50)
    private String email;
    private String name;
    private String password;
    private String role;
    private String organizationEmail;

    public Account (){

    }

    public Account (String email, String name, String password, String role, String organizationEmail){
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
        this.organizationEmail = organizationEmail;
    }

    public String getName (){
        return this.name;
    }

    public String getEmail (){
        return this.email;
    }

    public void setPassword (String password) {
        this.password = password;
    }

    public String getPassword () {
        return this.password;
    }

    public String getRole () {
        return this.role;
    }

    @Override
    public String toString() {
        return "Account {" +
                "email = " + email +
                ", password = " + password +
                ", name = " + name +
                ", role = " + role +
                ", organizationEmail = " + organizationEmail +"}";
    }

    public String getOrganizationEmail() {
        return organizationEmail;
    }

    public void setOrganizationEmail(String organizationEmail) {
        this.organizationEmail = organizationEmail;
    }
}
