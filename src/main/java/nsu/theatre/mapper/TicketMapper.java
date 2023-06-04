package nsu.theatre.mapper;

import nsu.theatre.dto.TicketDTO;
import nsu.theatre.entity.Ticket;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {
    private final PerformanceMapper performanceMapper;
    private final DateOfPlayingMapper dateOfPlayingMapper;

    public TicketMapper(PerformanceMapper performanceMapper, DateOfPlayingMapper dateOfPlayingMapper) {
        this.performanceMapper = performanceMapper;
        this.dateOfPlayingMapper = dateOfPlayingMapper;
    }

    public TicketDTO toDTO(Ticket ticket) {
        TicketDTO ticketDTO = new TicketDTO();
        ticketDTO.setId(ticket.getId());
        ticketDTO.setPrice(ticket.getPrice());
        ticketDTO.setPerformance(performanceMapper.toDTO(ticket.getPerformance()));
        ticketDTO.setDate(dateOfPlayingMapper.toDTO(ticket.getDate()));

        return ticketDTO;
    }

    public Ticket toEntity(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        ticket.setId(ticketDTO.getId());
        ticket.setPrice(ticketDTO.getPrice());
        ticket.setPerformance(performanceMapper.toEntity(ticketDTO.getPerformance()));
        ticket.setDate(dateOfPlayingMapper.toEntity(ticketDTO.getDate()));

        return ticket;
    }
}