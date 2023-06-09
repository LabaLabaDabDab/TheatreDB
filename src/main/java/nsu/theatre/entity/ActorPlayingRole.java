package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "actor_playing_role")
public class ActorPlayingRole {
    @EmbeddedId
    private ActorRoleId id;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "actor_playing_role_role_id_fkey"), insertable = false, updatable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "actor_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "actor_playing_role_actor_id_fkey"), insertable = false, updatable = false)
    private Actor actor;

    @Column(name = "is_main")
    private Boolean main;

    @Column(name = "date_of_playing")
    private Date date;
}
