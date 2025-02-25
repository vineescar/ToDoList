package covreage.assesignment.demo.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "todos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private boolean completed = false;

    @Column(nullable = false)
    private String dateAdded;

    private String time;

    @Column(nullable = false)
    private String taskDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Severity severity;

    public enum Severity {
        Low, Medium, High, Critical
    }
}
