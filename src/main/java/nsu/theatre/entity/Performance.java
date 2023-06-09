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

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    @Column(name = "time_duration", precision = 3)
    private Long time;

    @ManyToOne
    @JoinColumn(name = "director_performance_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "director_performance___fk"), insertable = false, updatable = false)
    private Director director;

    @ManyToOne
    @JoinColumn(name = "musician_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "musician_perf___fk"), insertable = false, updatable = false)
    private Musician musician;

    @ManyToOne
    @JoinColumn(name = "producer_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "producer_perf___fk"), insertable = false, updatable = false)
    private Producer producer;
}