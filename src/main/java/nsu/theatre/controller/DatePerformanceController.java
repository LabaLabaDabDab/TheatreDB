package nsu.theatre.controller;

import nsu.theatre.dto.DatePerformanceDTO;
import nsu.theatre.entity.DatePerformance;
import nsu.theatre.entity.DatePerformanceId;
import nsu.theatre.mapper.DatePerformanceMapper;
import nsu.theatre.service.DatePerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/date-performances")
public class DatePerformanceController {
    private final DatePerformanceService datePerformanceService;

    @Autowired
    public DatePerformanceController(DatePerformanceService datePerformanceService) {
        this.datePerformanceService = datePerformanceService;
    }

    @GetMapping
    public ResponseEntity<List<DatePerformanceDTO>> getAllDatePerformances() {
        List<DatePerformanceDTO> datePerformancesList = datePerformanceService.getAllDatePerformances();
        return new ResponseEntity<>(datePerformancesList, HttpStatus.OK);
    }

    @GetMapping("/{dateId}/{performanceId}")
    public ResponseEntity<DatePerformanceDTO> getDatePerformanceById(@PathVariable("dateId") Long dateId, @PathVariable("performanceId") Long performanceId) {
        DatePerformanceDTO datePerformanceDTO = datePerformanceService.getDatePerformanceById(dateId, performanceId);
        if (datePerformanceDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(datePerformanceDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DatePerformanceDTO> createDatePerformance(@RequestBody DatePerformanceDTO datePerformanceDTO) {
        DatePerformanceDTO createdDatePerformance = datePerformanceService.createDatePerformance(datePerformanceDTO);
        return new ResponseEntity<>(createdDatePerformance, HttpStatus.CREATED);
    }

    @PutMapping("/{dateId}/{performanceId}")
    public ResponseEntity<DatePerformanceDTO> updateDatePerformance(@PathVariable("dateId") Long dateId,
                                                                    @PathVariable("performanceId") Long performanceId,
                                                                    @RequestBody DatePerformanceDTO datePerformanceDTO) {
        DatePerformanceDTO updatedDatePerformanceDTO = datePerformanceService.updateDatePerformance(dateId, performanceId, datePerformanceDTO);
        if (updatedDatePerformanceDTO == null) {
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedDatePerformanceDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{dateId}/{performanceId}")
    public ResponseEntity<Void> deleteDatePerformance(@PathVariable("dateId") Long dateId,
                                                      @PathVariable("performanceId") Long performanceId) {
        datePerformanceService.deleteDatePerformance(dateId, performanceId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}