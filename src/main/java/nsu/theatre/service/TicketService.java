package nsu.theatre.service;

import nsu.theatre.dto.TicketDTO;
import nsu.theatre.entity.Ticket;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.TicketMapper;
import nsu.theatre.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;

    public TicketService(TicketRepository ticketRepository, TicketMapper ticketMapper) {
        this.ticketRepository = ticketRepository;
        this.ticketMapper = ticketMapper;
    }

    public List<TicketDTO> getAllTickets() {
        List<Ticket> ticketList = ticketRepository.findAll();
        return ticketList.stream()
                .map(ticketMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TicketDTO getTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found with id: " + id));
        return ticketMapper.toDTO(ticket);
    }

    public TicketDTO createTicket(TicketDTO ticketDTO) {
        Ticket ticket = ticketMapper.toEntity(ticketDTO);
        Ticket createdTicket = ticketRepository.save(ticket);
        return ticketMapper.toDTO(createdTicket);
    }

    public TicketDTO updateTicket(Long id, TicketDTO ticketDTO) {
        Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found with id: " + id));
        Ticket updateTicket = ticketMapper.toEntity(ticketDTO);
        updateTicket.setId(existingTicket.getId());
        Ticket savedTicket = ticketRepository.save(updateTicket);
        return ticketMapper.toDTO(savedTicket);
    }

    public void deleteTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found with id: " + id));
        ticketRepository.deleteById(id);
    }
}