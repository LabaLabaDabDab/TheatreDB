package nsu.theatre.service;

import nsu.theatre.dto.PerformanceDTO;
import nsu.theatre.dto.filter.PerformanceByAuthorFilterDTO;
import nsu.theatre.dto.filter.PerformanceDetailsDTO;
import nsu.theatre.dto.filter.PerformanceFilterBySeasonDTO;
import nsu.theatre.dto.response.ResponsePerformanceByAuthorDTO;
import nsu.theatre.dto.response.ResponsePerformanceDetailsDTO;
import nsu.theatre.entity.Performance;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.PerformanceMapper;
import nsu.theatre.repository.PerformanceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
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

    public Page<PerformanceDTO> getAllPerformances(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Performance> pagedResult = performanceRepository.findAll(pageable);
        return pagedResult.map(performanceMapper::toDTO);
    }

    public List<PerformanceDTO> getAllPerformancesList() {
        List<Performance> performanceList = performanceRepository.findAll();
        return performanceList.stream()
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

    public List<ResponsePerformanceByAuthorDTO> findByFilter(PerformanceByAuthorFilterDTO filterDTO) {
        List<Object[]> results = performanceRepository.findByFilter(
                filterDTO.getGenre(),
                filterDTO.getAuthor(),
                filterDTO.getCountry(),
                filterDTO.getCentury().get(0),
                filterDTO.getCentury().get(1),
                filterDTO.getDatePerformance().get(0),
                filterDTO.getDatePerformance().get(1)
        );

        List<ResponsePerformanceByAuthorDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponsePerformanceByAuthorDTO dto = new ResponsePerformanceByAuthorDTO();
            dto.setAuthorName((String) result[0]);
            dto.setTitle((String) result[1]);
            dto.setGenre((String) result[2]);
            dto.setCountry((String) result[3]);
            dto.setAuthorBirth((Date) result[4]);
            dto.setAuthorDeath((Date) result[5]);
            dto.setFirstPerformanceDate((Date) result[6]);
            response.add(dto);
        }

        return response;
    }

    public List<ResponsePerformanceDetailsDTO> getPerformanceDetails(PerformanceDetailsDTO detailsDTO) {
        List<Object[]> results = performanceRepository.findPerformanceDetails(detailsDTO.getPerformance());

        List<ResponsePerformanceDetailsDTO> response = new ArrayList<>();
        for (Object[] result : results) {
            ResponsePerformanceDetailsDTO dto = new ResponsePerformanceDetailsDTO();
            dto.setActorName((String) result[0]);
            dto.setProducerName((String) result[1]);
            dto.setMusicianName((String) result[2]);
            dto.setDirectorName((String) result[3]);
            dto.setAuthorName((String) result[4]);
            dto.setPremiereDate((Date) result[5]);
            response.add(dto);
        }

        return response;
    }
}