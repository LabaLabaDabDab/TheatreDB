package nsu.theatre.service;


import nsu.theatre.dto.MusicianDTO;
import nsu.theatre.entity.Employee;
import nsu.theatre.entity.Musician;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.EmployeeMapper;
import nsu.theatre.mapper.MusicianMapper;
import nsu.theatre.repository.EmployeeRepository;
import nsu.theatre.repository.MusicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MusicianService {
    private final MusicianRepository musicianRepository;
    private final EmployeeRepository employeeRepository;
    private final MusicianMapper musicianMapper;
    private final EmployeeMapper employeeMapper;

    @Autowired
    public MusicianService(MusicianRepository musicianRepository, EmployeeRepository employeeRepository, MusicianMapper musicianMapper, EmployeeMapper employeeMapper) {
        this.musicianRepository = musicianRepository;
        this.employeeRepository = employeeRepository;
        this.musicianMapper = musicianMapper;
        this.employeeMapper = employeeMapper;
    }

    public Page<MusicianDTO> getAllMusicians(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Musician> pagedResult = musicianRepository.findAll(pageable);
        return pagedResult.map(musicianMapper::toDTO);
    }

    public List<MusicianDTO> getAllMusiciansList() {
        List<Musician> musicianList = musicianRepository.findAll();
        return musicianList.stream()
                .map(musicianMapper::toDTO)
                .collect(Collectors.toList());
    }


    public MusicianDTO getMusician(Long id) {
        Musician musician = musicianRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Musician not found"));
        return musicianMapper.toDTO(musician);
    }

    public MusicianDTO createMusician(MusicianDTO musicianDTO) {
        Employee employee = employeeRepository.findById(musicianDTO.getEmployee().getId()).
                orElseThrow(() -> new RuntimeException("Employee not found"));

        musicianDTO.setEmployee(employeeMapper.toDTO(employee));
        Musician musician = musicianMapper.toEntity(musicianDTO);
        Musician savedMusician = musicianRepository.save(musician);
        return musicianMapper.toDTO(savedMusician);
    }

    public void deleteMusician(Long id) {
        Musician musician = musicianRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Musician not found with id: " + id));
        musicianRepository.delete(musician);
    }

    public MusicianDTO updateMusician(Long id, MusicianDTO musicianDTO) {
        Musician musician = musicianRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Musician not found with id: " + id));
        Employee employee = employeeRepository.findById(musicianDTO.getEmployee().getId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        musician.setEmployee(employee);

        Musician updatedMusician = musicianRepository.save(musician);
        return musicianMapper.toDTO(updatedMusician);
    }
}