package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;
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

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "performance_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Performance performance;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "date_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DateOfPlaying date;
}
