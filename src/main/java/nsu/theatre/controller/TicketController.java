package nsu.theatre.controller;

import nsu.theatre.dto.TicketDTO;
import nsu.theatre.dto.filter.FreeSeatsFilterDTO;
import nsu.theatre.dto.filter.TotalRevenueFilterDTO;
import nsu.theatre.dto.response.*;
import nsu.theatre.dto.filter.SoldTicketsCountFilterDTO;
import nsu.theatre.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/tickets")
public class TicketController {
    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<List<TicketDTO>> getAllTickets() {
        List<TicketDTO> ticket = ticketService.getAllTickets();
        return ResponseEntity.ok(ticket);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable("id") Long id) {
        TicketDTO ticketDTO = ticketService.getTicketById(id);
        if (ticketDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ticketDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TicketDTO> createTicket(@RequestBody TicketDTO ticketDTO) {
        TicketDTO createdTicket = ticketService.createTicket(ticketDTO);
        return new ResponseEntity<>(createdTicket, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketDTO> updateTicket(@PathVariable("id") Long id, @RequestBody TicketDTO ticketDTO) {
        TicketDTO updatedTicket = ticketService.updateTicket(id, ticketDTO);
        if (updatedTicket == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedTicket, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable("id") Long id) {
        ticketService.deleteTicket(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/sold-tickets-count")
    public ResponseEntity<List<ResponseSoldTicketsCountDTO>> getSoldTicketsCountByPerformanceTitleAndDate(
            @RequestBody SoldTicketsCountFilterDTO soldTicketsCountFilterDTO) {
        List<ResponseSoldTicketsCountDTO> response = ticketService.getSoldTicketsCountByPerformanceTitleAndDate(soldTicketsCountFilterDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/sold-tickets-on-premiere")
    public List<ResponseSoldTicketsOnPremiereCountDTO> getSoldTicketsCountByPremiere() {
        return ticketService.getSoldTicketsCountByPremiere();
    }

    @PostMapping("/total-revenue")
    public ResponseEntity<List<ResponseTotalRevenueDTO>> getTotalRevenueByPerformanceAndDate(
            @RequestBody TotalRevenueFilterDTO totalRevenueFilterDTO) {
        List<ResponseTotalRevenueDTO> response = ticketService.getTotalRevenueByPerformanceAndDate(totalRevenueFilterDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/free-seats")
    public ResponseEntity<List<ResponseFreeSeatsDTO>> getFreeSeatsByPerformance(
            @RequestBody FreeSeatsFilterDTO freeSeatsFilterDTO) {
        List<ResponseFreeSeatsDTO> response = ticketService.getFreeSeatsByPerformance(freeSeatsFilterDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/total-free-seats")
    public ResponseEntity<List<ResponseTotalFreeSeatsDTO>> getTotalFreeSeatsByPerformance(
            @RequestBody FreeSeatsFilterDTO filterDTO) {
        List<ResponseTotalFreeSeatsDTO> response = ticketService.getTotalFreeSeatsByPerformance(filterDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/total-free-seats-on-premiere")
    public ResponseEntity<List<ResponseTotalFreeSeatsOnPremiereDTO>> getTotalFreeSeatsOnPremiere() {
        List<ResponseTotalFreeSeatsOnPremiereDTO> response = ticketService.getTotalFreeSeatsOnPremiere();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/free-seats-on-premiere")
    public ResponseEntity<List<ResponseFreeSeatsOnPremiereDTO>> getFreeSeatsOnPremiere() {
        List<ResponseFreeSeatsOnPremiereDTO> response = ticketService.getFreeSeatsOnPremiere();
        return ResponseEntity.ok(response);
    }
}