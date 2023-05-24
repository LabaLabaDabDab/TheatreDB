package nsu.theatre.repository;

import nsu.theatre.entity.ActorPlayingRole;
import nsu.theatre.entity.ActorRoleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorPlayingRoleRepository extends JpaRepository<ActorPlayingRole, ActorRoleId> {
}
