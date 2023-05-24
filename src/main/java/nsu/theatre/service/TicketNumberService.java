package nsu.theatre.service;

import nsu.theatre.dto.TicketNumberDTO;

import nsu.theatre.entity.Ticket;
import nsu.theatre.entity.TicketNumber;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.TicketMapper;
import nsu.theatre.mapper.TicketNumberMapper;

import nsu.theatre.repository.TicketNumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class TicketNumberService {
    private final TicketNumberRepository ticketNumberRepository;
    private final TicketNumberMapper ticketNumberMapper;
    private final TicketMapper ticketMapper;

    @Autowired
    public TicketNumberService(TicketNumberRepository ticketNumberRepository, TicketNumberMapper ticketNumberMapper,
                               TicketMapper ticketMapper) {
        this.ticketNumberRepository = ticketNumberRepository;
        this.ticketNumberMapper = ticketNumberMapper;
        this.ticketMapper = ticketMapper;
    }

    public List<TicketNumberDTO> getAllTicketNumbers() {
        List<TicketNumber> ticketNumberList = ticketNumberRepository.findAll();
        return ticketNumberList.stream()
                .map(ticketNumberMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TicketNumberDTO getTicketNumberById(Ticket id) {
        TicketNumber ticketNumber = ticketNumberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket Number not found with id: " + id));
        return ticketNumberMapper.toDTO(ticketNumber);
    }

    public TicketNumberDTO createTicketNumber(TicketNumberDTO ticketNumberDTO) {
        TicketNumber ticketNumber = ticketNumberMapper.toEntity(ticketNumberDTO);
        TicketNumber createdTicketNumber = ticketNumberRepository.save(ticketNumber);
        return ticketNumberMapper.toDTO(createdTicketNumber);
    }

    public TicketNumberDTO updateTicketNumber(Ticket id, TicketNumberDTO ticketNumberDTO) {
        TicketNumber existingTicketNumber = ticketNumberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket Number not found with id: " + id));

        existingTicketNumber.setTicket(ticketMapper.toEntity(ticketNumberDTO.getTicket()));
        //existingTicketNumber.setNumber_ticket(ticketNumberDTO.getNumber_ticket());

        TicketNumber updatedTicketNumber = ticketNumberRepository.save(existingTicketNumber);
        return ticketNumberMapper.toDTO(updatedTicketNumber);
    }

    public void deleteTicketNumber(Ticket id) {
        TicketNumber ticketNumber = ticketNumberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket Number not found with id: " + id));
        ticketNumberRepository.delete(ticketNumber);
    }
}
