package nsu.theatre.entity;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "date_of_playing")
public class DateOfPlaying {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pet_seq")
    @GenericGenerator(name = "pet_seq", strategy = "increment")
    private Long id;

    @Column(name = "date_of_performance")
    private Date date_of_performance;

    @Column(name = "season")
    private Long season;

    @Column(name = "count_of_tickets")
    private Long ticketsCount;

    @Column(name = "is_tour")
    private Boolean isTour;

    //@OneToMany(mappedBy = "date", cascade = CascadeType.REMOVE)
    //private List<DatePerformance> date;
}
