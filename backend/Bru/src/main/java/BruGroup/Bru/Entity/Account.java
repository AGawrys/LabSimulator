package BruGroup.Bru.Entity;

import javax.persistence.*;
import javax.validation.constraints.Size;

enum Role
{
    STUDENT, ORGANIZATION, INSTRUCTOR
}

@Table(name = "Account")
@Entity
public class Account {

    @Id
    @Size(max = 50)
    private String email;
    private String name;
    private String password;
    private Role role;

    public Account (){

    }

    public Account (String email, String name, String password, String role){
        this.email = email;
        this.name = name;
        this.password = password;

        if (role.equals("STUDENT")) {
            this.role = Role.STUDENT;
        } else if (role.equals("INSTRUCTOR")) {
            this.role = Role.INSTRUCTOR;
        } else if (role.equals("ORGANIZATION")) {
            this.role = Role.ORGANIZATION;
        }

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

    @Override
    public String toString() {
        return "Account {" +
                "email = " + email +
                ", password = " + password +
                ", name = " + name +
                ", role = " + this.getRole() + "}";
    }

    public String getRole() {
        switch (this.role) {
            case STUDENT:
                return "STUDENT";
            case INSTRUCTOR:
                return "INSTRUCTOR";
            case ORGANIZATION:
                return "ORGANIZATION";
        }
        return "";
    }

}
