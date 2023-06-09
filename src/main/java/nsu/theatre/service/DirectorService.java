package nsu.theatre.service;

import nsu.theatre.dto.DirectorDTO;
import nsu.theatre.entity.Director;
import nsu.theatre.entity.Employee;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.DirectorMapper;
import nsu.theatre.mapper.EmployeeMapper;
import nsu.theatre.repository.DirectorRepository;
import nsu.theatre.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DirectorService {
    private final DirectorRepository directorRepository;
    private final EmployeeRepository employeeRepository;
    private final DirectorMapper directorMapper;
    private final EmployeeMapper employeeMapper;

    @Autowired
    public DirectorService(DirectorRepository directorRepository, EmployeeRepository employeeRepository, DirectorMapper directorMapper, EmployeeMapper employeeMapper) {
        this.directorRepository = directorRepository;
        this.employeeRepository = employeeRepository;
        this.directorMapper = directorMapper;
        this.employeeMapper = employeeMapper;
    }

    public Page<DirectorDTO> getAllDirectors(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Director> pagedResult = directorRepository.findAll(pageable);
        return pagedResult.map(directorMapper::toDTO);
    }

    public List<DirectorDTO> getAllDirectorsList() {
        List<Director> directorList = directorRepository.findAll();
        return directorList.stream()
                .map(directorMapper::toDTO)
                .collect(Collectors.toList());
    }

    public DirectorDTO getDirector(Long id) {
        Director director = directorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Director not found"));
        return directorMapper.toDTO(director);
    }

    public DirectorDTO createDirector(DirectorDTO directorDTO) {
        Employee employee = employeeRepository.findById(directorDTO.getEmployee().getId()).
                orElseThrow(() -> new RuntimeException("Employee not found"));

        directorDTO.setEmployee(employeeMapper.toDTO(employee));
        Director director = directorMapper.toEntity(directorDTO);
        Director savedDirector = directorRepository.save(director);
        return directorMapper.toDTO(savedDirector);
    }

    public void deleteDirector(Long id) {
        directorRepository.deleteById(id);
    }

    public DirectorDTO updateDirector(Long id, DirectorDTO directorDTO) {
        Director director = directorRepository.findById(id).orElseThrow(() -> new RuntimeException("Director not found"));
        Employee employee = employeeRepository.findById(directorDTO.getEmployee().getId()).orElseThrow(() -> new RuntimeException("Employee not found"));
        director.setEmployee(employee);

        Director updatedDirector = directorRepository.save(director);
        return directorMapper.toDTO(updatedDirector);
    }
}