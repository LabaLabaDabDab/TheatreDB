package nsu.theatre.repository;

import nsu.theatre.entity.ActorTour;
import nsu.theatre.entity.ActorTourId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorTourRepository extends JpaRepository<ActorTour, ActorTourId> {
}
