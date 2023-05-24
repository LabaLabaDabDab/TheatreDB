package nsu.theatre.mapper;

import nsu.theatre.dto.DatePerformanceDTO;
import nsu.theatre.entity.DatePerformance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DatePerformanceMapper {
    private final DateOfPlayingMapper dateOfPlayingMapper;
    private final PerformanceMapper performanceMapper;

    public DatePerformanceMapper(DateOfPlayingMapper dateOfPlayingMapper, PerformanceMapper performanceMapper) {
        this.dateOfPlayingMapper = dateOfPlayingMapper;
        this.performanceMapper = performanceMapper;
    }

    public DatePerformanceDTO toDTO(DatePerformance datePerformance) {
        DatePerformanceDTO datePerformanceDTO = new DatePerformanceDTO();
        datePerformanceDTO.setId(datePerformance.getId());
        datePerformanceDTO.setDate(dateOfPlayingMapper.toDTO(datePerformance.getDate()));
        datePerformanceDTO.setPerformance(performanceMapper.toDTO(datePerformance.getPerformance()));

        return datePerformanceDTO;
    }

    public DatePerformance toEntity(DatePerformanceDTO datePerformanceDTO) {
        DatePerformance datePerformance = new DatePerformance();
        datePerformance.setId(datePerformanceDTO.getId());
        datePerformance.setDate(dateOfPlayingMapper.toEntity(datePerformanceDTO.getDate()));
        datePerformance.setPerformance(performanceMapper.toEntity(datePerformanceDTO.getPerformance()));

        return datePerformance;
    }
}