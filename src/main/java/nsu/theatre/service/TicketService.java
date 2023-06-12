package nsu.theatre.service;

import nsu.theatre.dto.TicketDTO;
import nsu.theatre.dto.filter.FreeSeatsFilterDTO;
import nsu.theatre.dto.filter.SoldTicketsCountFilterDTO;
import nsu.theatre.dto.filter.TotalRevenueFilterDTO;
import nsu.theatre.dto.response.*;
import nsu.theatre.entity.*;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.DatePerformanceMapper;
import nsu.theatre.mapper.TicketMapper;
import nsu.theatre.repository.DatePerformanceRepository;
import nsu.theatre.repository.TicketRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;
    private final DatePerformanceMapper datePerformanceMapper;
    private final DatePerformanceRepository datePerformanceRepository;

    public TicketService(TicketRepository ticketRepository, TicketMapper ticketMapper, DatePerformanceMapper datePerformanceMapper, DatePerformanceRepository datePerformanceRepository) {
        this.ticketRepository = ticketRepository;
        this.ticketMapper = ticketMapper;
        this.datePerformanceMapper = datePerformanceMapper;
        this.datePerformanceRepository = datePerformanceRepository;
    }

    public Page<TicketDTO> getAllTickets(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Ticket> pagedResult = ticketRepository.findAll(pageable);
        return pagedResult.map(ticketMapper::toDTO);
    }

    public List<TicketDTO> getAllTicketsList() {
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
        Long dateId = ticketDTO.getDatePerformance().getId().getDateId();
        Long performanceId = ticketDTO.getDatePerformance().getId().getPerformanceId();

        DatePerformance datePerformance = datePerformanceRepository.findById(new DatePerformanceId(dateId, performanceId))
                .orElseThrow(() -> new NotFoundException("DatePerformance not found with id: " +  dateId + ", " +  performanceId));

        ticketDTO.setDatePerformance(datePerformanceMapper.toDTO(datePerformance));

        Ticket ticket = ticketMapper.toEntity(ticketDTO);
        Ticket createdTicket = ticketRepository.save(ticket);
        return ticketMapper.toDTO(createdTicket);
    }

    public TicketDTO updateTicket(Long id, TicketDTO ticketDTO) {
        DatePerformance datePerformance = datePerformanceRepository.findById(new DatePerformanceId(
                        ticketDTO.getDatePerformance().getDate().getId(),
                        ticketDTO.getDatePerformance().getPerformance().getId())
                )
                .orElseThrow(() -> new NotFoundException("DatePerformance not found with id: " +  ticketDTO.getDatePerformance().getPerformance().getId() + ", " +  ticketDTO.getDatePerformance().getDate().getId()));

        Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found with id: " + id));

        existingTicket.setPrice(ticketDTO.getPrice());
        existingTicket.setDatePerformance(datePerformance);

        Ticket savedTicket = ticketRepository.save(existingTicket);
        return ticketMapper.toDTO(savedTicket);
    }


    public void deleteTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found with id: " + id));
        ticketRepository.deleteById(id);
    }

    public List<ResponseSoldTicketsCountDTO> getSoldTicketsCountByPerformanceTitleAndDate(SoldTicketsCountFilterDTO soldTicketsCountFilterDTO) {
        List<Object[]> results = ticketRepository.getSoldTicketsCountByPerformanceTitleAndDate(
                soldTicketsCountFilterDTO.getPerformance(),
                soldTicketsCountFilterDTO.getDate_performance().get(0),
                soldTicketsCountFilterDTO.getDate_performance().get(1),
                soldTicketsCountFilterDTO.getPremiere()
        );
        List<ResponseSoldTicketsCountDTO> response = new ArrayList<>();

        for (Object[] result : results){
            ResponseSoldTicketsCountDTO dto = new ResponseSoldTicketsCountDTO();
            dto.setPerformanceTitle((String) result[0]);
            dto.setDateOfPerformance((Date) result[1]);
            dto.setSoldTicketsCount((Long) result[2]);
            response.add(dto);
        }
        return response;
    }

    public List<ResponseTotalRevenueDTO> getTotalRevenueByPerformanceAndDate(TotalRevenueFilterDTO filterDTO) {
        List<Object[]> results = ticketRepository.getTotalRevenueByPerformanceAndDate(
                filterDTO.getPerformance(),
                filterDTO.getDate_performance().get(0),
                filterDTO.getDate_performance().get(1)
        );
        List<ResponseTotalRevenueDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponseTotalRevenueDTO dto = new ResponseTotalRevenueDTO();
            dto.setPerformanceTitle((String) result[0]);
            dto.setDateOfPerformance((Date) result[1]);
            dto.setTotalRevenue((Long) result[2]);
            response.add(dto);
        }

        return response;
    }

    public List<ResponseFreeSeatsDTO> getFreeSeatsByPerformance(FreeSeatsFilterDTO filterDTO) {
        List<Object[]> results = ticketRepository.getFreeSeatsByPerformance(
                filterDTO.getPerformance(),
                filterDTO.getPremiere()
        );
        List<ResponseFreeSeatsDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponseFreeSeatsDTO dto = new ResponseFreeSeatsDTO();
            dto.setPerformanceTitle((String) result[0]);
            dto.setDateOfPerformance((Date) result[1]);
            dto.setTicketNumberId((Long) result[2]);
            response.add(dto);
        }

        return response;
    }

    public Long getTotalFreeSeatsByPerformance(FreeSeatsFilterDTO filterDTO) {
        return ticketRepository.getTotalFreeSeatsByPerformance(
                filterDTO.getPerformance(),
                filterDTO.getPremiere()
        );
    }
}