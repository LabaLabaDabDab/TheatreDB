package nsu.theatre.mapper;

import nsu.theatre.dto.TicketDTO;
import nsu.theatre.entity.Ticket;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {
    private final PerformanceMapper performanceMapper;
    private final DateOfPlayingMapper dateOfPlayingMapper;
    private final DatePerformanceMapper datePerformanceMapper;

    public TicketMapper(PerformanceMapper performanceMapper, DateOfPlayingMapper dateOfPlayingMapper, DatePerformanceMapper datePerformanceMapper) {
        this.performanceMapper = performanceMapper;
        this.dateOfPlayingMapper = dateOfPlayingMapper;
        this.datePerformanceMapper = datePerformanceMapper;
    }

    public TicketDTO toDTO(Ticket ticket) {
        TicketDTO ticketDTO = new TicketDTO();
        ticketDTO.setId(ticket.getId());
        ticketDTO.setPrice(ticket.getPrice());
        ticketDTO.setDatePerformance(datePerformanceMapper.toDTO(ticket.getDatePerformance()));

        return ticketDTO;
    }

    public Ticket toEntity(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        ticket.setId(ticketDTO.getId());
        ticket.setPrice(ticketDTO.getPrice());
        ticket.setDatePerformance(datePerformanceMapper.toEntity(ticketDTO.getDatePerformance()));

        return ticket;
    }
}