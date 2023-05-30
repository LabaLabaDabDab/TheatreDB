package nsu.theatre.mapper;

import nsu.theatre.dto.DatePerformanceDTO;
import nsu.theatre.dto.response.ResponseAuthorPerformanceDTO;
import nsu.theatre.dto.response.ResponseDatePerformanceDTO;
import nsu.theatre.dto.response.ResponseEmployeeDTO;
import nsu.theatre.entity.DatePerformance;
import nsu.theatre.entity.Employee;
import org.springframework.stereotype.Component;

import java.util.Date;

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

    public ResponseDatePerformanceDTO toDTOResponse(DatePerformance datePerformance) {
        ResponseDatePerformanceDTO ResponseDatePerformanceDTO = new ResponseDatePerformanceDTO();
        ResponseDatePerformanceDTO.setId(datePerformance.getPerformance().getId());
        ResponseDatePerformanceDTO.setDate_perf(dateOfPlayingMapper.toDTO(datePerformance.getDate()).getDateOfPerformance());
        ResponseDatePerformanceDTO.setSeason(dateOfPlayingMapper.toDTO(datePerformance.getDate()).getSeason());
        ResponseDatePerformanceDTO.setName(performanceMapper.toDTO(datePerformance.getPerformance()).getAuthor().getName());
        ResponseDatePerformanceDTO.setGenre(performanceMapper.toDTO(datePerformance.getPerformance()).getAuthor().getGenre().getName());
        ResponseDatePerformanceDTO.setTitle(performanceMapper.toDTO(datePerformance.getPerformance()).getAuthor().getTitle());
        return ResponseDatePerformanceDTO;
    }
    public ResponseAuthorPerformanceDTO toDTOAuthorResponse(DatePerformance author){
        ResponseAuthorPerformanceDTO responseAuthorPerformanceDTO = new ResponseAuthorPerformanceDTO();
        responseAuthorPerformanceDTO.setName(performanceMapper.toDTO(author.getPerformance()).getAuthor().getName());
        responseAuthorPerformanceDTO.setTitle(performanceMapper.toDTO(author.getPerformance()).getAuthor().getTitle());
        responseAuthorPerformanceDTO.setCountry(performanceMapper.toDTO(author.getPerformance()).getAuthor().getCountry().getName());
        responseAuthorPerformanceDTO.setGenre(performanceMapper.toDTO(author.getPerformance()).getAuthor().getGenre().getName());
        responseAuthorPerformanceDTO.setBirthDate(performanceMapper.toDTO(author.getPerformance()).getAuthor().getBirthDate());
        responseAuthorPerformanceDTO.setDeathDate(performanceMapper.toDTO(author.getPerformance()).getAuthor().getDeathDate());
        responseAuthorPerformanceDTO.setDate_perf(dateOfPlayingMapper.toDTO(author.getDate()).getDateOfPerformance());
        return responseAuthorPerformanceDTO;
    }
}