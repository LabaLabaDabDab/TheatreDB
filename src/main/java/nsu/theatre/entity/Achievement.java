package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "achievement")
public class Achievement {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "date_of_competition")
    private Date dateCompetition;

    @Column(name = "competition")
    private String competition;

    @ManyToOne
    @JoinColumn(name = "actor_id")
    private Actor actor;

    @Column(name = "rank")
    private String rank;
}
