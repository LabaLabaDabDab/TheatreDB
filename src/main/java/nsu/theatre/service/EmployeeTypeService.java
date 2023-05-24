package nsu.theatre.service;

import nsu.theatre.dto.EmployeeTypeDTO;
import nsu.theatre.entity.EmployeeType;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.EmployeeTypeMapper;
import nsu.theatre.repository.EmployeeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeTypeService {
    private final EmployeeTypeRepository employeeTypeRepository;
    private final EmployeeTypeMapper employeeTypeMapper;

    public EmployeeTypeService(EmployeeTypeRepository employeeTypeRepository, EmployeeTypeMapper employeeTypeMapper) {
        this.employeeTypeRepository = employeeTypeRepository;
        this.employeeTypeMapper = employeeTypeMapper;
    }

    public List<EmployeeTypeDTO> getAllEmployeeTypes() {
        List<EmployeeType> employeeTypes = employeeTypeRepository.findAll();
        return employeeTypes.stream()
                .map(employeeTypeMapper::toDTO)
                .collect(Collectors.toList());
    }

    public EmployeeTypeDTO getEmployeeTypeById(Long id) {
        EmployeeType employeeType = employeeTypeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("EmployeeType not found with id: " + id));
        return employeeTypeMapper.toDTO(employeeType);
    }

    public EmployeeTypeDTO createEmployeeType(EmployeeTypeDTO employeeTypeDTO) {
        EmployeeType employeeType = employeeTypeMapper.toEntity(employeeTypeDTO);
        EmployeeType savedEmployeeType = employeeTypeRepository.save(employeeType);
        return employeeTypeMapper.toDTO(savedEmployeeType);
    }

    public EmployeeTypeDTO updateEmployeeType(Long id, EmployeeTypeDTO employeeTypeDTO) {
        EmployeeType existingEmployeeType = employeeTypeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("EmployeeType not found with id: " + id));
        EmployeeType updatedEmployeeType = employeeTypeMapper.toEntity(employeeTypeDTO);
        updatedEmployeeType.setId(existingEmployeeType.getId());
        EmployeeType savedEmployeeType = employeeTypeRepository.save(updatedEmployeeType);
        return employeeTypeMapper.toDTO(savedEmployeeType);
    }

    public void deleteEmployeeType(Long id) {
        EmployeeType employeeType = employeeTypeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("EmployeeType not found with id: " + id));
        employeeTypeRepository.delete(employeeType);
    }
}
