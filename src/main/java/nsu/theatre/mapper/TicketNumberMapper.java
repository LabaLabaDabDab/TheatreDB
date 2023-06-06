package nsu.theatre.mapper;

import nsu.theatre.dto.TicketNumberDTO;
import nsu.theatre.entity.TicketNumber;
import nsu.theatre.entity.TicketNumberId;
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
        ticketNumberDTO.setId(ticketNumber.getId());
        ticketNumberDTO.setTicket(ticketMapper.toDTO(ticketNumber.getTicket()));
        ticketNumberDTO.setIsSold(ticketNumber.getIsSold());

        return ticketNumberDTO;
    }

    public TicketNumber toEntity(TicketNumberDTO ticketNumberDTO) {
        TicketNumber ticketNumber = new TicketNumber();
        ticketNumber.setId(ticketNumberDTO.getId());
        ticketNumber.setTicket(ticketMapper.toEntity(ticketNumberDTO.getTicket()));
        ticketNumber.setIsSold(ticketNumberDTO.getIsSold());

        return ticketNumber;
    }
}
