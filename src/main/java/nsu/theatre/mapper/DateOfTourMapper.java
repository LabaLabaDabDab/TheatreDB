package nsu.theatre.mapper;

import nsu.theatre.dto.DateOfTourDTO;
import nsu.theatre.entity.DateOfTour;
import org.springframework.stereotype.Component;

@Component
public class DateOfTourMapper {
    private final PerformanceMapper performanceMapper;

    public DateOfTourMapper(PerformanceMapper performanceMapper) {
        this.performanceMapper = performanceMapper;
    }

    public DateOfTourDTO toDTO(DateOfTour dateOfTour) {
        DateOfTourDTO dateOfTourDTO = new DateOfTourDTO();
        dateOfTourDTO.setId(dateOfTour.getId());
        dateOfTourDTO.setDateStart(dateOfTour.getDate_start());
        dateOfTourDTO.setDateEnd(dateOfTour.getDate_end());
        dateOfTourDTO.setPerformance(performanceMapper.toDTO(dateOfTour.getPerformance()));

        return dateOfTourDTO;
    }

    public DateOfTour toEntity(DateOfTourDTO dateOfTourDTO) {
        DateOfTour dateOfTour = new DateOfTour();
        dateOfTour.setId(dateOfTourDTO.getId());
        dateOfTour.setDate_start(dateOfTourDTO.getDateStart());
        dateOfTour.setDate_end(dateOfTourDTO.getDateEnd());
        dateOfTour.setPerformance(performanceMapper.toEntity(dateOfTourDTO.getPerformance()));

        return dateOfTour;
    }
}