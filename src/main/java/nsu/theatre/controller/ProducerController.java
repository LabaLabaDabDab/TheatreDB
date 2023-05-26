package nsu.theatre.controller;


import nsu.theatre.dto.ProducerDTO;
import nsu.theatre.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/producers")
public class ProducerController {

    private final ProducerService producerService;

    @Autowired
    public ProducerController(ProducerService producerService) {
        this.producerService = producerService;
    }

    @GetMapping
    public ResponseEntity<List<ProducerDTO>> getAllProducers() {
        List<ProducerDTO> producers = producerService.getAllProducers();
        return new ResponseEntity<>(producers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProducerDTO> getProducerById(@PathVariable("id") Long id) {
        ProducerDTO producer = producerService.getProducer(id);
        if (producer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(producer, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProducerDTO> createProducer(@RequestBody ProducerDTO producerDTO) {
        ProducerDTO createdProducer = producerService.createProducer(producerDTO);
        return new ResponseEntity<>(createdProducer, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProducerDTO> updateProducer(@PathVariable("id") Long id, @RequestBody ProducerDTO producerDTO) {
        ProducerDTO updatedProducer = producerService.updateProducer(id, producerDTO);
        if (updatedProducer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedProducer, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducer(@PathVariable Long id) {
        producerService.deleteProducer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}