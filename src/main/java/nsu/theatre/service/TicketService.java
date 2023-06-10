package nsu.theatre.service;

import nsu.theatre.dto.TicketDTO;
import nsu.theatre.dto.filter.FreeSeatsFilterDTO;
import nsu.theatre.dto.filter.SoldTicketsCountFilterDTO;
import nsu.theatre.dto.filter.TotalRevenueFilterDTO;
import nsu.theatre.dto.response.*;
import nsu.theatre.entity.DateOfPlaying;
import nsu.theatre.entity.Performance;
import nsu.theatre.entity.Ticket;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.DateOfPlayingMapper;
import nsu.theatre.mapper.PerformanceMapper;
import nsu.theatre.mapper.TicketMapper;
import nsu.theatre.repository.DateOfPlayingRepository;
import nsu.theatre.repository.PerformanceRepository;
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
    private final PerformanceMapper performanceMapper;
    private final PerformanceRepository performanceRepository;
    private final DateOfPlayingMapper dateOfPlayingMapper;
    private final DateOfPlayingRepository dateOfPlayingRepository;

    public TicketService(TicketRepository ticketRepository, TicketMapper ticketMapper, PerformanceMapper performanceMapper, PerformanceRepository performanceRepository, DateOfPlayingMapper dateOfPlayingMapper, DateOfPlayingRepository dateOfPlayingRepository) {
        this.ticketRepository = ticketRepository;
        this.ticketMapper = ticketMapper;
        this.performanceMapper = performanceMapper;
        this.performanceRepository = performanceRepository;
        this.dateOfPlayingMapper = dateOfPlayingMapper;
        this.dateOfPlayingRepository = dateOfPlayingRepository;
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
        Performance performance = performanceRepository.findById(ticketDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("performance not found with id: " + ticketDTO.getPerformance().getId()));
        DateOfPlaying dateOfPlaying = dateOfPlayingRepository.findById(ticketDTO.getDate().getId())
                .orElseThrow(() -> new NotFoundException("dateOfPlaying not found with id: " + ticketDTO.getDate().getId()));

        ticketDTO.setPerformance(performanceMapper.toDTO(performance));
        ticketDTO.setDate(dateOfPlayingMapper.toDTO(dateOfPlaying));

        Ticket ticket = ticketMapper.toEntity(ticketDTO);
        Ticket createdTicket = ticketRepository.save(ticket);
        return ticketMapper.toDTO(createdTicket);
    }

    public TicketDTO updateTicket(Long id, TicketDTO ticketDTO) {
        Performance performance = performanceRepository.findById(ticketDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("performance not found with id: " + ticketDTO.getPerformance().getId()));
        DateOfPlaying dateOfPlaying = dateOfPlayingRepository.findById(ticketDTO.getDate().getId())
                .orElseThrow(() -> new NotFoundException("dateOfPlaying not found with id: " + ticketDTO.getDate().getId()));

        Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found with id: " + id));

        existingTicket.setPrice(ticketDTO.getPrice());
        existingTicket.setPerformance(performance);
        existingTicket.setDate(dateOfPlaying);

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
                soldTicketsCountFilterDTO.getDate_performance().get(1)
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

    public List<ResponseSoldTicketsOnPremiereCountDTO> getSoldTicketsCountByPremiere() {
        List<Object[]> results = ticketRepository.getSoldTicketsCountByPremiere();
        List<ResponseSoldTicketsOnPremiereCountDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponseSoldTicketsOnPremiereCountDTO dto = new ResponseSoldTicketsOnPremiereCountDTO();
            dto.setPerformanceTitle((String) result[0]);
            dto.setPremiereDate((Date) result[1]);
            dto.setCount((Long) result[2]);
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
                filterDTO.getPerformance()
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

    public List<ResponseTotalFreeSeatsDTO> getTotalFreeSeatsByPerformance(FreeSeatsFilterDTO filterDTO) {
        List<Object[]> results = ticketRepository.getTotalFreeSeatsByPerformance(filterDTO.getPerformance());
        List<ResponseTotalFreeSeatsDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponseTotalFreeSeatsDTO dto = new ResponseTotalFreeSeatsDTO();
            dto.setPerformanceTitle((String) result[0]);
            dto.setDateOfPerformance((Date) result[1]);
            dto.setTotalFreeSeats((Long) result[2]);
            response.add(dto);
        }

        return response;
    }
    public List<ResponseFreeSeatsOnPremiereDTO> getFreeSeatsOnPremiere() {
        List<Object[]> results = ticketRepository.getFreeSeatsOnPremiere();
        List<ResponseFreeSeatsOnPremiereDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponseFreeSeatsOnPremiereDTO dto = new ResponseFreeSeatsOnPremiereDTO();
            dto.setPerformanceTitle((String) result[0]);
            dto.setTicketNumberId((Long) result[1]);
            response.add(dto);
        }

        return response;
    }
    public List<ResponseTotalFreeSeatsOnPremiereDTO> getTotalFreeSeatsOnPremiere() {
        List<Object[]> results = ticketRepository.getTotalFreeSeatsOnPremiere();
        List<ResponseTotalFreeSeatsOnPremiereDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponseTotalFreeSeatsOnPremiereDTO dto = new ResponseTotalFreeSeatsOnPremiereDTO();
            dto.setPerformanceTitle((String) result[0]);
            dto.setTotalFreeSeats((Long) result[1]);
            response.add(dto);
        }

        return response;
    }
}