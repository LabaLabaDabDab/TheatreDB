package nsu.theatre.controller;

import nsu.theatre.dto.ProducerPerformanceDTO;
import nsu.theatre.service.ProducerPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/producer-performances")
public class ProducerPerformanceController {
    private final ProducerPerformanceService producerPerformanceService;

    @Autowired
    public ProducerPerformanceController(ProducerPerformanceService producerPerformanceService) {
        this.producerPerformanceService = producerPerformanceService;
    }

    @GetMapping
    public ResponseEntity<Page<ProducerPerformanceDTO>> getAllProducerPerformances(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize) {
        Page<ProducerPerformanceDTO> page = producerPerformanceService.getAllProducerPerformances(pageNo, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ProducerPerformanceDTO>> getAllProducerPerformancesList() {
        List<ProducerPerformanceDTO> producerPerformanceList = producerPerformanceService.getAllProducerPerformancesList();
        return new ResponseEntity<>(producerPerformanceList, HttpStatus.OK);
    }

    @GetMapping("/{producerId}/{performanceId}")
    public ResponseEntity<ProducerPerformanceDTO> getProducerPerformanceById(@PathVariable("producerId") Long producerId,
                                                                             @PathVariable("performanceId") Long performanceId) {
        ProducerPerformanceDTO producerPerformanceDTO = producerPerformanceService.getProducerPerformanceById(producerId, performanceId);
        if (producerPerformanceDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(producerPerformanceDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProducerPerformanceDTO> createProducerPerformance(@RequestBody ProducerPerformanceDTO producerPerformanceDTO) {
        ProducerPerformanceDTO createdProducerPerformance = producerPerformanceService.createProducerPerformance(producerPerformanceDTO);
        return new ResponseEntity<>(createdProducerPerformance, HttpStatus.CREATED);
    }

    @PutMapping("/{producerId}/{performanceId}")
    public ResponseEntity<ProducerPerformanceDTO> updateProducerPerformance(@PathVariable("producerId") Long producerId,
                                                                            @PathVariable("performanceId") Long performanceId,
                                                                            @RequestBody ProducerPerformanceDTO producerPerformanceDTO) {
        ProducerPerformanceDTO updatedProducerPerformance = producerPerformanceService.updateProducerPerformance(producerId, performanceId, producerPerformanceDTO);
        if (updatedProducerPerformance == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedProducerPerformance, HttpStatus.OK);
    }

    @DeleteMapping("/{producerId}/{performanceId}")
    public ResponseEntity<Void> deleteProducerPerformance(@PathVariable("producerId") Long producerId,
                                                          @PathVariable("performanceId") Long performanceId) {
        producerPerformanceService.deleteProducerPerformance(producerId, performanceId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
