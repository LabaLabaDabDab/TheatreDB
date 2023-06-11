package nsu.theatre.repository;

import nsu.theatre.entity.ActorPlayingRole;
import nsu.theatre.entity.ActorRoleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorPlayingRoleRepository extends JpaRepository<ActorPlayingRole, ActorRoleId> {
}
