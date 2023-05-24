package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "actor_tour")
public class ActorTour {
    @EmbeddedId
    private ActorTourId id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "date_of_tour_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "actor_tour_date_of_tour_id_fkey"), insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DateOfTour date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "actor_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "actor_tour_actor_id_fkey"), insertable = false, updatable = false)
    private Actor actor;
}
