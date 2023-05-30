package nsu.theatre.service;

import lombok.AllArgsConstructor;
import nsu.theatre.dto.EmployeeDTO;
import nsu.theatre.dto.filter.EmployeeFilterDTO;
import nsu.theatre.dto.filter.PerformanceFilterBySeasonDTO;
import nsu.theatre.dto.response.ResponseEmployeeDTO;
import nsu.theatre.entity.Employee;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.EmployeeMapper;
import nsu.theatre.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.sql.Date;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }

    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(employeeMapper::toDTO)
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found with id: " + id));
        return employeeMapper.toDTO(employee);
    }

    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = employeeMapper.toEntity(employeeDTO);
        Employee savedEmployee = employeeRepository.save(employee);
        return employeeMapper.toDTO(savedEmployee);
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found with id: " + id));
        Employee updatedEmployee = employeeMapper.toEntity(employeeDTO);
        updatedEmployee.setId(existingEmployee.getId());
        Employee savedEmployee = employeeRepository.save(updatedEmployee);
        return employeeMapper.toDTO(savedEmployee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found with id: " + id));
        employeeRepository.delete(employee);
    }

    public List<ResponseEmployeeDTO> getFilterEmployees(EmployeeFilterDTO employeeFilterDTO) {
        List<Employee> employees = employeeRepository.findByFilter(
                employeeFilterDTO.getTypes(),
                Date.from(ZonedDateTime.now().minusYears(employeeFilterDTO.getYears().get(1)).toInstant()),
                Date.from(ZonedDateTime.now().minusYears(employeeFilterDTO.getYears().get(0)).toInstant()),
                employeeFilterDTO.getGenders(),
                employeeFilterDTO.getBirth_dates().get(0),
                employeeFilterDTO.getBirth_dates().get(1),
                employeeFilterDTO.getAmount_children().get(0),
                employeeFilterDTO.getAmount_children().get(1),
                employeeFilterDTO.getSalary().get(0),
                employeeFilterDTO.getSalary().get(1)
        );
        return employees.stream()
                .map(employeeMapper::toDTOResponse)
                .collect(Collectors.toList());
    }

    public Long getCount(EmployeeFilterDTO employeeFilterDTO){
        return employeeRepository.countByFilter(
                employeeFilterDTO.getTypes(),
                Date.from(ZonedDateTime.now().minusYears(employeeFilterDTO.getYears().get(1)).toInstant()),
                Date.from(ZonedDateTime.now().minusYears(employeeFilterDTO.getYears().get(0)).toInstant()),
                employeeFilterDTO.getGenders(),
                employeeFilterDTO.getBirth_dates().get(0),
                employeeFilterDTO.getBirth_dates().get(1),
                employeeFilterDTO.getAmount_children().get(0),
                employeeFilterDTO.getAmount_children().get(1),
                employeeFilterDTO.getSalary().get(0),
                employeeFilterDTO.getSalary().get(1)
        );
    }
}