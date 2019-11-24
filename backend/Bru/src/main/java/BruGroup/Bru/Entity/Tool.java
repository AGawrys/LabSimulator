package BruGroup.Bru.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Table(name = "Tool")
@Entity
public class Tool {

    @EmbeddedId
    private ToolIdentity toolIdentity;

    @NotNull
    private String toolType;

    @NotNull
    private double x;

    @NotNull
    private double y;

    private int amount;
    private String color;

    public Tool() {

    }

    public Tool(ToolIdentity toolIdentity, double x, double y, int amount, String color) {
        this.toolIdentity = toolIdentity;
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.color = color;
    }

    public ToolIdentity getToolIdentity() {
        return toolIdentity;
    }

    public void setToolIdentity(ToolIdentity toolIdentity) {
        this.toolIdentity = toolIdentity;
    }

    public String getToolType() {
        return toolType;
    }

    public void setToolType(String toolType) {
        this.toolType = toolType;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
