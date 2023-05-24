package nsu.theatre.repository;

import nsu.theatre.entity.Ticket;
import nsu.theatre.entity.TicketNumber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketNumberRepository extends JpaRepository<TicketNumber, Ticket> {
}


