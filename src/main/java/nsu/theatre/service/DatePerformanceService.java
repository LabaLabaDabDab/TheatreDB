package nsu.theatre.service;

import nsu.theatre.dto.DatePerformanceDTO;
import nsu.theatre.dto.filter.PerformanceFilterBySeasonDTO;
import nsu.theatre.dto.response.ResponseDatePerformanceDTO;
import nsu.theatre.entity.DatePerformance;
import nsu.theatre.entity.DatePerformanceId;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.DateOfPlayingMapper;
import nsu.theatre.mapper.DatePerformanceMapper;
import nsu.theatre.mapper.PerformanceMapper;
import nsu.theatre.repository.DatePerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DatePerformanceService {
    private final DatePerformanceRepository datePerformanceRepository;
    private final DatePerformanceMapper datePerformanceMapper;
    private final DateOfPlayingMapper dateOfPlayingMapper;
    private final PerformanceMapper performanceMapper;

    @Autowired
    public DatePerformanceService(DatePerformanceRepository datePerformanceRepository, DatePerformanceMapper datePerformanceMapper,
                                  DateOfPlayingMapper dateOfPlayingMapper, PerformanceMapper performanceMapper) {
        this.datePerformanceRepository = datePerformanceRepository;
        this.datePerformanceMapper = datePerformanceMapper;
        this.dateOfPlayingMapper = dateOfPlayingMapper;
        this.performanceMapper = performanceMapper;
    }

    public Page<DatePerformanceDTO> getAllDatePerformances(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<DatePerformance> pagedResult = datePerformanceRepository.findAll(pageable);
        return pagedResult.map(datePerformanceMapper::toDTO);
    }

    public List<DatePerformanceDTO> getAllDatePerformancesList() {
        List<DatePerformance> datePerformanceList = datePerformanceRepository.findAll();
        return datePerformanceList.stream()
                .map(datePerformanceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public DatePerformanceDTO getDatePerformanceById(Long dateId, Long performanceId) {
        DatePerformanceId id = new DatePerformanceId(dateId, performanceId);
        DatePerformance datePerformance = datePerformanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("datePerformance not found with id: " + id));
        return datePerformanceMapper.toDTO(datePerformance);
    }

    public DatePerformanceDTO createDatePerformance(DatePerformanceDTO datePerformanceDTO) {
        DatePerformance datePerformance = datePerformanceMapper.toEntity(datePerformanceDTO);
        DatePerformance createdDatePerformance = datePerformanceRepository.save(datePerformance);
        return datePerformanceMapper.toDTO(createdDatePerformance);
    }

    public DatePerformanceDTO updateDatePerformance(Long dateId, Long performanceId, DatePerformanceDTO datePerformanceDTO) {
        DatePerformanceId id = new DatePerformanceId(dateId, performanceId);
        DatePerformance existingDatePerformance = datePerformanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("datePerformance not found with id: " + id));

        existingDatePerformance.setDate(dateOfPlayingMapper.toEntity(datePerformanceDTO.getDate()));
        existingDatePerformance.setPerformance(performanceMapper.toEntity(datePerformanceDTO.getPerformance()));

        DatePerformance updatedDatePerformance = datePerformanceRepository.save(existingDatePerformance);
        return datePerformanceMapper.toDTO(updatedDatePerformance);
    }

    public void deleteDatePerformance(Long dateId, Long performanceId) {
        DatePerformanceId id = new DatePerformanceId(dateId, performanceId);
        DatePerformance existingDatePerformance = datePerformanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("datePerformance not found with id: " + id));
        datePerformanceRepository.delete(existingDatePerformance);
    }

    public List<ResponseDatePerformanceDTO> getFilterPerformances(PerformanceFilterBySeasonDTO performanceFilterBySeasonDTO) {
        List<DatePerformance> filteredPerformances = datePerformanceRepository.findBySeasonFilter(
                performanceFilterBySeasonDTO.getSeasons(),
                performanceFilterBySeasonDTO.getDate_performance_start(),
                performanceFilterBySeasonDTO.getDate_performance_end(),
                performanceFilterBySeasonDTO.getGenres()
        );
        return filteredPerformances.stream()
                .map(datePerformanceMapper::toDTOResponse)
                .collect(Collectors.toList());
    }

    public Long getCount(PerformanceFilterBySeasonDTO performanceFilterBySeasonDTO){
        return datePerformanceRepository.countBySeasonFilter(
                performanceFilterBySeasonDTO.getSeasons(),
                performanceFilterBySeasonDTO.getDate_performance_start(),
                performanceFilterBySeasonDTO.getDate_performance_end(),
                performanceFilterBySeasonDTO.getGenres()
        );
    }

}