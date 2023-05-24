package nsu.theatre.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class ActorTourId implements Serializable {
    @Column(name = "date_of_tour_id")
    private Long dateID;

    @Column(name = "actor_id")
    private Long actorID;
}
