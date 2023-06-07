package nsu.theatre.service;

import nsu.theatre.dto.EmployeeTypeDTO;
import nsu.theatre.entity.EmployeeType;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.EmployeeTypeMapper;
import nsu.theatre.repository.EmployeeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public Page<EmployeeTypeDTO> getAllEmployeeTypes(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<EmployeeType> pagedResult = employeeTypeRepository.findAll(pageable);
        return pagedResult.map(employeeTypeMapper::toDTO);
    }

    public List<EmployeeTypeDTO> getAllEmployeeTypesList() {
        List<EmployeeType> employeeTypeList = employeeTypeRepository.findAll();
        return employeeTypeList.stream()
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
