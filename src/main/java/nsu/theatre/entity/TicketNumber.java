package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "ticket_number")
public class TicketNumber {
    @EmbeddedId
    private TicketNumberId id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "ticket_id", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name = "FK_TicketPlace_Ticket"), insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ticket ticket;
}
