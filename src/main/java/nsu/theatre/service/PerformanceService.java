package nsu.theatre.service;

import nsu.theatre.dto.PerformanceDTO;
import nsu.theatre.entity.Performance;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.PerformanceMapper;
import nsu.theatre.repository.PerformanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PerformanceService {
    private final PerformanceRepository performanceRepository;
    private final PerformanceMapper performanceMapper;

    public PerformanceService(PerformanceRepository performanceRepository, PerformanceMapper performanceMapper) {
        this.performanceRepository = performanceRepository;
        this.performanceMapper = performanceMapper;
    }

    public List<PerformanceDTO> getAllPerformances() {
        List<Performance> performances = performanceRepository.findAll();
        return performances.stream()
                .map(performanceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public PerformanceDTO getPerformanceById(Long id) {
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + id));
        return performanceMapper.toDTO(performance);
    }

    public PerformanceDTO createPerformance(PerformanceDTO performanceDTO) {
        Performance performance = performanceMapper.toEntity(performanceDTO);
        Performance savedPerformance = performanceRepository.save(performance);
        return performanceMapper.toDTO(savedPerformance);
    }

    public PerformanceDTO updatePerformance(Long id, PerformanceDTO performanceDTO) {
        Performance existingPerformance = performanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + id));
        Performance updatedPerformance = performanceMapper.toEntity(performanceDTO);
        updatedPerformance.setId(existingPerformance.getId());
        Performance savedPerformance = performanceRepository.save(updatedPerformance);
        return performanceMapper.toDTO(savedPerformance);
    }

    public void deletePerformance(Long id) {
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + id));
        performanceRepository.delete(performance);
    }
}