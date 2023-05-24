package nsu.theatre.dto;

import lombok.Data;

@Data
public class TicketNumberDTO {
    private TicketDTO ticket;
    private Long number_ticket;
}
