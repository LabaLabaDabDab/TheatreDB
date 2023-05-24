package nsu.theatre.mapper;

import nsu.theatre.dto.TicketNumberDTO;
import nsu.theatre.entity.TicketNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketNumberMapper {
    private final TicketMapper ticketMapper;

    @Autowired
    public TicketNumberMapper(TicketMapper ticketMapper) {
        this.ticketMapper = ticketMapper;
    }

    public TicketNumberDTO toDTO(TicketNumber ticketNumber) {
        TicketNumberDTO ticketNumberDTO = new TicketNumberDTO();
        ticketNumberDTO.setTicket(ticketMapper.toDTO(ticketNumber.getTicket()));
        //ticketNumberDTO.setNumber_ticket(ticketNumber.getNumber_ticket());
        return ticketNumberDTO;
    }

    public TicketNumber toEntity(TicketNumberDTO ticketNumberDTO) {
        TicketNumber ticketNumber = new TicketNumber();
        ticketNumber.setTicket(ticketMapper.toEntity(ticketNumberDTO.getTicket()));
        //ticketNumber.setNumber_ticket(ticketNumberDTO.getNumber_ticket());
        return ticketNumber;
    }
}
