package nsu.theatre.controller;

import nsu.theatre.dto.EmployeeDTO;
import nsu.theatre.dto.filter.EmployeeFilterDTO;
import nsu.theatre.dto.filter.PerformanceFilterBySeasonDTO;
import nsu.theatre.dto.response.ResponseEmployeeDTO;
import nsu.theatre.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable("id") Long id) {
        EmployeeDTO employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO savedEmployee = employeeService.createEmployee(employeeDTO);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable("id") Long id, @RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO updatedEmployee = employeeService.updateEmployee(id, employeeDTO);
        if (updatedEmployee == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/filter")
    public ResponseEntity<List<ResponseEmployeeDTO>> getFilterEmployees(@RequestBody EmployeeFilterDTO employeeFilterDTO) {
        List<ResponseEmployeeDTO> employees = employeeService.getFilterEmployees(employeeFilterDTO);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    @PostMapping("/filter/count")
    public ResponseEntity<Long> getCountByFilter(@RequestBody EmployeeFilterDTO employeeFilterDTO) {
        Long count = employeeService.getCount(employeeFilterDTO);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}