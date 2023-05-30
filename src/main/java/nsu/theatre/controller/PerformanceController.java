package nsu.theatre.controller;

import nsu.theatre.dto.PerformanceDTO;
import nsu.theatre.dto.filter.PerformanceByAuthorFilterDTO;
import nsu.theatre.dto.filter.PerformanceDetailsDTO;
import nsu.theatre.dto.filter.PerformanceFilterBySeasonDTO;
import nsu.theatre.dto.response.ResponsePerformanceByAuthorDTO;
import nsu.theatre.dto.response.ResponsePerformanceDetailsDTO;
import nsu.theatre.service.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/performances")
public class PerformanceController {
    private final PerformanceService performanceService;

    @Autowired
    public PerformanceController(PerformanceService performanceService) {
        this.performanceService = performanceService;
    }

    @GetMapping
    public ResponseEntity<List<PerformanceDTO>> getAllPerformances() {
        List<PerformanceDTO> performances = performanceService.getAllPerformances();
        return new ResponseEntity<>(performances, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerformanceDTO> getPerformanceById(@PathVariable("id") Long id) {
        PerformanceDTO performance = performanceService.getPerformanceById(id);
        if (performance == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(performance, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PerformanceDTO> createPerformance(@RequestBody PerformanceDTO performanceDTO) {
        PerformanceDTO savedPerformance = performanceService.createPerformance(performanceDTO);
        return new ResponseEntity<>(savedPerformance, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerformanceDTO> updatePerformance(@PathVariable("id") Long id, @RequestBody PerformanceDTO performanceDTO) {
        PerformanceDTO updatedPerformance = performanceService.updatePerformance(id, performanceDTO);
        if (updatedPerformance == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedPerformance, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerformance(@PathVariable("id") Long id) {
        performanceService.deletePerformance(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/filter")
    public ResponseEntity<List<ResponsePerformanceByAuthorDTO>> filterPerformanceByAuthor(
            @RequestBody PerformanceByAuthorFilterDTO filterDTO) {
        List<ResponsePerformanceByAuthorDTO> results = performanceService.findByFilter(filterDTO);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @PostMapping("/details")
    public List<ResponsePerformanceDetailsDTO> getPerformanceDetails(@RequestBody PerformanceDetailsDTO detailsDTO) {
        return performanceService.getPerformanceDetails(detailsDTO);
    }
}