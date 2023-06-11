package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@Entity
@Table(name = "tickets")
public class Ticket {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pet_seq")
    @GenericGenerator(name = "pet_seq", strategy = "increment")
    private Long id;

    @Column(name = "price")
    private Short price;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name="date_id", referencedColumnName="date_id"),
            @JoinColumn(name="performance_id", referencedColumnName="performance_id")
    })
    private DatePerformance datePerformance;
}
