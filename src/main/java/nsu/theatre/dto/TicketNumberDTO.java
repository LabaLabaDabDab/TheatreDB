package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.TicketNumberId;

@Data
public class TicketNumberDTO {
    private TicketNumberId id;
    private TicketDTO ticket;
    private Boolean isSold;
}
