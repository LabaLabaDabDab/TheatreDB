package nsu.theatre.controller;

import nsu.theatre.dto.EmployeeTypeDTO;
import nsu.theatre.mapper.EmployeeTypeMapper;
import nsu.theatre.service.EmployeeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employeeTypes")
public class EmployeeTypeController {
    private final EmployeeTypeService employeeTypeService;

    @Autowired
    public EmployeeTypeController(EmployeeTypeService employeeTypeService) {
        this.employeeTypeService = employeeTypeService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeTypeDTO>> getAllEmployeeTypes() {
        List<EmployeeTypeDTO> employeeTypes = employeeTypeService.getAllEmployeeTypes();
        return new ResponseEntity<>(employeeTypes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeTypeDTO> getEmployeeTypeById(@PathVariable("id") Long id) {
        EmployeeTypeDTO employeeType = employeeTypeService.getEmployeeTypeById(id);
        if (employeeType == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employeeType, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EmployeeTypeDTO> createEmployeeType(@RequestBody EmployeeTypeDTO employeeTypeDTO) {
        EmployeeTypeDTO savedEmployeeType = employeeTypeService.createEmployeeType(employeeTypeDTO);
        return new ResponseEntity<>(savedEmployeeType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeTypeDTO> updateEmployeeType(@PathVariable("id") Long id, @RequestBody EmployeeTypeDTO employeeTypeDTO) {
        EmployeeTypeDTO updatedEmployeeType = employeeTypeService.updateEmployeeType(id, employeeTypeDTO);
        if (updatedEmployeeType == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedEmployeeType, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeeType(@PathVariable("id") Long id) {
        employeeTypeService.deleteEmployeeType(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
