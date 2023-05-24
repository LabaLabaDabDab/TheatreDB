package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class TicketNumberId implements Serializable {
    @Column(name = "ticket_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Long ticket;
    @Column(name = "number_ticket")
    private Long number_ticket;
}
