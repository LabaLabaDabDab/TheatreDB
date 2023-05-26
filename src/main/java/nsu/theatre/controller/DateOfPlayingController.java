package nsu.theatre.controller;

import nsu.theatre.dto.DateOfPlayingDTO;
import nsu.theatre.service.DateOfPlayingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/date-of-playing")
public class DateOfPlayingController {
    private final DateOfPlayingService dateOfPlayingService;

    @Autowired
    public DateOfPlayingController(DateOfPlayingService dateOfPlayingService) {
        this.dateOfPlayingService = dateOfPlayingService;
    }

    @GetMapping
    public ResponseEntity<List<DateOfPlayingDTO>> getAllDateOfPlaying() {
        List<DateOfPlayingDTO> dateOfPlayingList = dateOfPlayingService.getAllDateOfPlaying();
        return new ResponseEntity<>(dateOfPlayingList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DateOfPlayingDTO> createDateOfPlaying(@RequestBody DateOfPlayingDTO dateOfPlayingDTO) {
        DateOfPlayingDTO createdDateOfPlaying = dateOfPlayingService.createDateOfPlaying(dateOfPlayingDTO);
        return new ResponseEntity<>(createdDateOfPlaying, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DateOfPlayingDTO> getDateOfPlayingById(@PathVariable("id") Long id) {
        DateOfPlayingDTO dateOfPlayingDTO = dateOfPlayingService.getDateOfPlayingById(id);
        if (dateOfPlayingDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(dateOfPlayingDTO, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DateOfPlayingDTO> updateDateOfPlaying(@PathVariable("id") Long id, @RequestBody DateOfPlayingDTO dateOfPlayingDTO) {
        DateOfPlayingDTO updatedDateOfPlaying = dateOfPlayingService.updateDateOfPlaying(id, dateOfPlayingDTO);
        if (updatedDateOfPlaying == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedDateOfPlaying, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDateOfPlaying(@PathVariable("id") Long id) {
        dateOfPlayingService.deleteDateOfPlaying(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}