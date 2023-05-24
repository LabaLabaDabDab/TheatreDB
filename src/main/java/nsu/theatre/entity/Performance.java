package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "performances")
public class Performance {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pet_seq")
    @GenericGenerator(name = "pet_seq", strategy = "increment")
    private Long id;

    @Column(name = "age_limit")
    private Long limit;

    @Column(name = "premiere_date")
    private Date premiere;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "author_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Author author;

    @Column(name = "time_duration", precision = 3, scale = 0)
    private Long time;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "director_performance_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Director director;
}