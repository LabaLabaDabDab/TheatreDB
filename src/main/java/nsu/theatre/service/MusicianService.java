package nsu.theatre.service;


import nsu.theatre.dto.MusicianDTO;
import nsu.theatre.entity.Employee;
import nsu.theatre.entity.Musician;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.MusicianMapper;
import nsu.theatre.repository.EmployeeRepository;
import nsu.theatre.repository.MusicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MusicianService {
    private final MusicianRepository musicianRepository;
    private final EmployeeRepository employeeRepository;
    private final MusicianMapper musicianMapper;

    @Autowired
    public MusicianService(MusicianRepository musicianRepository, EmployeeRepository employeeRepository, MusicianMapper musicianMapper) {
        this.musicianRepository = musicianRepository;
        this.employeeRepository = employeeRepository;
        this.musicianMapper = musicianMapper;
    }

    public List<MusicianDTO> getAllMusicians() {
        List<Musician> musicians = musicianRepository.findAll();
        return musicians.stream()
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
        System.out.println(employee);
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
        Musician musician = musicianRepository.findById(id).orElseThrow(() -> new NotFoundException("Musician not found with id: " + id));
        Employee employee = employeeRepository.findById(musicianDTO.getEmployee().getId()).orElseThrow(() -> new RuntimeException("Employee not found"));
        musician.setEmployee(employee);

        Musician updatedMusician = musicianRepository.save(musician);
        return musicianMapper.toDTO(updatedMusician);
    }
}