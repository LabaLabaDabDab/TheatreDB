package nsu.theatre.service;

import nsu.theatre.dto.DatePerformanceDTO;
import nsu.theatre.dto.filter.PerformanceFilterBySeasonDTO;
import nsu.theatre.dto.response.ResponseDatePerformanceDTO;
import nsu.theatre.entity.DateOfPlaying;
import nsu.theatre.entity.DatePerformance;
import nsu.theatre.entity.DatePerformanceId;
import nsu.theatre.entity.Performance;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.DateOfPlayingMapper;
import nsu.theatre.mapper.DatePerformanceMapper;
import nsu.theatre.mapper.PerformanceMapper;
import nsu.theatre.repository.DateOfPlayingRepository;
import nsu.theatre.repository.DatePerformanceRepository;
import nsu.theatre.repository.PerformanceRepository;
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
    private final PerformanceRepository performanceRepository;
    private DateOfPlayingRepository dateOfPlayingRepository;

    @Autowired
    public DatePerformanceService(DatePerformanceRepository datePerformanceRepository, DatePerformanceMapper datePerformanceMapper,
                                  DateOfPlayingMapper dateOfPlayingMapper, PerformanceMapper performanceMapper, PerformanceRepository performanceRepository, DateOfPlayingRepository dateOfPlayingRepository) {
        this.datePerformanceRepository = datePerformanceRepository;
        this.datePerformanceMapper = datePerformanceMapper;
        this.dateOfPlayingMapper = dateOfPlayingMapper;
        this.performanceMapper = performanceMapper;
        this.performanceRepository = performanceRepository;
        this.dateOfPlayingRepository = dateOfPlayingRepository;
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
        Performance performance = performanceRepository.findById(datePerformanceDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("performance not found with id: " + datePerformanceDTO.getPerformance().getId()));
        DateOfPlaying dateOfPlaying = dateOfPlayingRepository.findById(datePerformanceDTO.getDate().getId())
                .orElseThrow(() -> new NotFoundException("dateOfPlaying not found with id: " + datePerformanceDTO.getDate().getId()));

        datePerformanceDTO.setPerformance(performanceMapper.toDTO(performance));
        datePerformanceDTO.setDate(dateOfPlayingMapper.toDTO(dateOfPlaying));

        DatePerformance datePerformance = datePerformanceMapper.toEntity(datePerformanceDTO);
        DatePerformance createdDatePerformance = datePerformanceRepository.save(datePerformance);
        return datePerformanceMapper.toDTO(createdDatePerformance);
    }

    public DatePerformanceDTO updateDatePerformance(Long dateId, Long performanceId, DatePerformanceDTO datePerformanceDTO) {
        DatePerformanceId id = new DatePerformanceId(dateId, performanceId);
        DatePerformance existingDatePerformance = datePerformanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("datePerformance not found with id: " + id));

        datePerformanceRepository.deleteById(id);

        DatePerformanceId newId = new DatePerformanceId(datePerformanceDTO.getDate().getId(), datePerformanceDTO.getPerformance().getId());
        Performance performance = performanceRepository.findById(datePerformanceDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("performance not found with id: " + datePerformanceDTO.getPerformance().getId()));
        DateOfPlaying dateOfPlaying = dateOfPlayingRepository.findById(datePerformanceDTO.getDate().getId())
                .orElseThrow(() -> new NotFoundException("dateOfPlaying not found with id: " + datePerformanceDTO.getDate().getId()));

        DatePerformance newDatePerformance = new DatePerformance();
        newDatePerformance.setId(newId);
        newDatePerformance.setPerformance(performance);
        newDatePerformance.setDate(dateOfPlaying);

        DatePerformance updatedDatePerformance = datePerformanceRepository.save(newDatePerformance);
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