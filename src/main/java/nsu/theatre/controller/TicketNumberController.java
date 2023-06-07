package nsu.theatre.controller;

import nsu.theatre.dto.TicketNumberDTO;
import nsu.theatre.service.TicketNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/ticket-numbers")
public class TicketNumberController {
    private final TicketNumberService ticketNumberService;

    @Autowired
    public TicketNumberController(TicketNumberService ticketNumberService) {
        this.ticketNumberService = ticketNumberService;
    }

    @GetMapping
    public ResponseEntity<Page<TicketNumberDTO>> getAllTicketNumbers(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize) {
        Page<TicketNumberDTO> page = ticketNumberService.getAllTicketNumbers(pageNo, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<TicketNumberDTO>> getAllTicketNumbersList() {
        List<TicketNumberDTO> ticketNumberList = ticketNumberService.getAllTicketNumbersList();
        return new ResponseEntity<>(ticketNumberList, HttpStatus.OK);
    }

        @GetMapping("/{ticketId}/{number_ticketId}")
    public ResponseEntity<TicketNumberDTO> getTicketNumberById(@PathVariable("ticketId") Long ticketId, @PathVariable("number_ticketId") Long number_ticketId) {
        TicketNumberDTO ticketNumberDTO = ticketNumberService.getTicketNumberById(ticketId, number_ticketId);
        return new ResponseEntity<>(ticketNumberDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TicketNumberDTO> createTicketNumber(@RequestBody TicketNumberDTO ticketNumberDTO) {
        TicketNumberDTO createdTicketNumber = ticketNumberService.createTicketNumber(ticketNumberDTO);
        return new ResponseEntity<>(createdTicketNumber, HttpStatus.CREATED);
    }

    @PutMapping("/{ticketId}/{number_ticketId}")
    public ResponseEntity<TicketNumberDTO> updateTicketNumber(@PathVariable("ticketId") Long ticketId, @PathVariable("number_ticketId") Long number_ticketId, @RequestBody TicketNumberDTO ticketNumberDTO) {
        TicketNumberDTO updatedTicketNumber = ticketNumberService.updateTicketNumber(ticketId, number_ticketId, ticketNumberDTO);
        return new ResponseEntity<>(updatedTicketNumber, HttpStatus.OK);
    }

    @DeleteMapping("/{ticketId}/{number_ticketId}")
    public ResponseEntity<Void> deleteTicketNumber(@PathVariable("ticketId") Long ticketId, @PathVariable("number_ticketId") Long number_ticketId) {
        ticketNumberService.deleteTicketNumber(ticketId, number_ticketId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}