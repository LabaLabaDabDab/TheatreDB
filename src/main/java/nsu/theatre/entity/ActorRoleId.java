package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ActorRoleId implements Serializable {
    @Column(name = "actor_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Long actorId;

    @Column(name = "role_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Long roleId;
}
