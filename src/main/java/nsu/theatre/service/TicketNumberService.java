package nsu.theatre.service;

import nsu.theatre.dto.TicketNumberDTO;

import nsu.theatre.entity.Ticket;
import nsu.theatre.entity.TicketNumber;
import nsu.theatre.entity.TicketNumberId;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.TicketMapper;
import nsu.theatre.mapper.TicketNumberMapper;

import nsu.theatre.repository.TicketNumberRepository;
import nsu.theatre.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class TicketNumberService {
    private final TicketNumberRepository ticketNumberRepository;
    private final TicketNumberMapper ticketNumberMapper;
    private final TicketMapper ticketMapper;
    private final TicketRepository ticketRepository;

    @Autowired
    public TicketNumberService(TicketNumberRepository ticketNumberRepository, TicketNumberMapper ticketNumberMapper, TicketMapper ticketMapper, TicketRepository ticketRepository) {
        this.ticketNumberRepository = ticketNumberRepository;
        this.ticketNumberMapper = ticketNumberMapper;
        this.ticketMapper = ticketMapper;
        this.ticketRepository = ticketRepository;
    }

    public Page<TicketNumberDTO> getAllTicketNumbers(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<TicketNumber> pagedResult = ticketNumberRepository.findAll(pageable);
        return pagedResult.map(ticketNumberMapper::toDTO);
    }

    public List<TicketNumberDTO> getAllTicketNumbersList() {
        List<TicketNumber> ticketNumberList = ticketNumberRepository.findAll();
        return ticketNumberList.stream()
                .map(ticketNumberMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TicketNumberDTO getTicketNumberById(Long ticketId, Long number_ticketId) {
        TicketNumberId id = new TicketNumberId(ticketId, number_ticketId);
        TicketNumber ticketNumber = ticketNumberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("TicketNumber not found with id: " + id));
        return ticketNumberMapper.toDTO(ticketNumber);
    }

    public TicketNumberDTO createTicketNumber(TicketNumberDTO ticketNumberDTO) {
        Ticket tickets = ticketRepository.findById(ticketNumberDTO.getTicket().getId())
                .orElseThrow(() -> new NotFoundException("ticket not found with id: " + ticketNumberDTO.getTicket().getId()));
        ticketNumberDTO.setTicket(ticketMapper.toDTO(tickets));

        TicketNumber ticketNumber = ticketNumberMapper.toEntity(ticketNumberDTO);
        TicketNumber createdTicketNumber = ticketNumberRepository.save(ticketNumber);
        return ticketNumberMapper.toDTO(createdTicketNumber);
    }

    public TicketNumberDTO updateTicketNumber(Long ticketId, Long number_ticketId, TicketNumberDTO ticketNumberDTO) {
        TicketNumberId newId = new TicketNumberId(ticketNumberDTO.getTicket().getId(), ticketNumberDTO.getId().getTicketId());
        TicketNumberId id = new TicketNumberId(ticketId, number_ticketId);
        TicketNumber existingTicketNumber = ticketNumberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("TicketNumber not found with id: " + id));

        ticketNumberRepository.deleteById(id);
        Ticket ticket = ticketRepository.findById(ticketNumberDTO.getTicket().getId())
                .orElseThrow(() -> new NotFoundException("ticket not found with id: " + ticketNumberDTO.getTicket().getId()));

        TicketNumber newTicketNumber = new TicketNumber();
        newTicketNumber.setId(newId);
        newTicketNumber.setTicket(ticket);
        newTicketNumber.setIsSold(ticketNumberDTO.getIsSold());

        TicketNumber updatedTicketNumber = ticketNumberRepository.save(newTicketNumber);
        return ticketNumberMapper.toDTO(updatedTicketNumber);
    }

    public void deleteTicketNumber(Long ticketId, Long number_ticketId) {
        TicketNumberId id = new TicketNumberId(ticketId, number_ticketId);
        TicketNumber existingTicketNumber = ticketNumberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("TicketNumber not found with id: " + id));
        ticketNumberRepository.delete(existingTicketNumber);
    }
}