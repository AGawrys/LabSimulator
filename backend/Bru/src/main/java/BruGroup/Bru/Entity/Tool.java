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

    private String name;
    private double amount;
    private String color;
    private double height;
    private double width;
    private double taper;
    private double capacity;
    private double intervals;

    public Tool() {

    }

    public Tool(ToolIdentity toolIdentity,
                String toolType,
                double x,
                double y,
                double amount,
                String color,
                String name,
                double width,
                double height,
                double taper,
                double capacity,
                double intervals) {
        this.toolIdentity = toolIdentity;
        this.toolType = toolType;
        this.x = x;
        this.y = y;
        this.name = name;
        this.amount = amount;
        this.color = color;
        this.height = height;
        this.width = width;
        this.taper = taper;
        this.capacity = capacity;
        this.intervals = intervals;

    }

    public Tool clone(int lessonId) {
        ToolIdentity clonedIdentity = this.toolIdentity.clone(lessonId);
        return new Tool(
                clonedIdentity,
                this.toolType,
                this.x,
                this.y,
                this.amount,
                this.color,
                this.name,
                this.width,
                this.height,
                this.taper,
                this.capacity,
                this.intervals
        );
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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getHeight() {return height;}

    public double getWidth() {return width;}

    public void setHeight(double height) {this.height = height;}

    public void setWidth(double width) {this.width = width;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getTaper() {
        return taper;
    }

    public void setTaper(double taper) {
        this.taper = taper;
    }

    public double getCapacity() {
        return capacity;
    }

    public void setCapacity(double capacity) {
        this.capacity = capacity;
    }

    public double getIntervals() {
        return intervals;
    }

    public void setIntervals(double intervals) {
        this.intervals = intervals;
    }
}
