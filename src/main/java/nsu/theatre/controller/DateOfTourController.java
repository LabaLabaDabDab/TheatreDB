package nsu.theatre.controller;

import nsu.theatre.dto.DateOfTourDTO;
import nsu.theatre.dto.filter.EmployeeDateOfTourFilterDTO;
import nsu.theatre.dto.response.ResponseEmployeeDateOfTourDTO;
import nsu.theatre.service.DateOfTourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/date-of-tours")
public class DateOfTourController {
    private final DateOfTourService dateOfTourService;

    @Autowired
    public DateOfTourController(DateOfTourService dateOfTourService) {
        this.dateOfTourService = dateOfTourService;
    }

    @GetMapping
    public ResponseEntity<Page<DateOfTourDTO>> getAllDateOfTours(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize) {
        Page<DateOfTourDTO> page = dateOfTourService.getAllDateOfTours(pageNo, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<DateOfTourDTO>> getAllDateOfToursList() {
        List<DateOfTourDTO> dateOfToursList = dateOfTourService.getAllDateOfToursList();
        return new ResponseEntity<>(dateOfToursList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DateOfTourDTO> getDateOfTourById(@PathVariable("id") Long id) {
        DateOfTourDTO dateOfTour = dateOfTourService.getDateOfTourById(id);
        if (dateOfTour == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(dateOfTour, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DateOfTourDTO> createDateOfTour(@RequestBody DateOfTourDTO dateOfTourDTO) {
        DateOfTourDTO createdDateOfTour = dateOfTourService.createDateOfTour(dateOfTourDTO);
        return new ResponseEntity<>(createdDateOfTour, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DateOfTourDTO> updateDateOfTour(@PathVariable Long id, @RequestBody DateOfTourDTO dateOfTourDTO) {
        DateOfTourDTO updatedDateOfTourDTO = dateOfTourService.updateDateOfTour(id, dateOfTourDTO);
        if (updatedDateOfTourDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedDateOfTourDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDateOfTour(@PathVariable Long id) {
        dateOfTourService.deleteDateOfTour(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/employee-date-of-tour")
    public List<ResponseEmployeeDateOfTourDTO> getEmployeeDateOfTour(@RequestBody EmployeeDateOfTourFilterDTO filterDTO) {
        return dateOfTourService.getEmployeeDateOfTour(filterDTO);
    }
}