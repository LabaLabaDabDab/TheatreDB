package nsu.theatre.service;

import nsu.theatre.dto.DateOfTourDTO;
import nsu.theatre.dto.filter.EmployeeDateOfTourFilterDTO;
import nsu.theatre.dto.response.ResponseEmployeeDateOfTourDTO;
import nsu.theatre.entity.DateOfTour;
import nsu.theatre.entity.Performance;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.AuthorMapper;
import nsu.theatre.mapper.DateOfTourMapper;
import nsu.theatre.mapper.PerformanceMapper;
import nsu.theatre.repository.DateOfTourRepository;
import nsu.theatre.repository.PerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DateOfTourService {
    private final DateOfTourRepository dateOfTourRepository;
    private final DateOfTourMapper dateOfTourMapper;
    private final AuthorMapper authorMapper;
    private final PerformanceRepository performanceRepository;
    private final PerformanceMapper performanceMapper;

    @Autowired
    public DateOfTourService(DateOfTourRepository dateOfTourRepository, DateOfTourMapper dateOfTourMapper, AuthorMapper authorMapper, PerformanceRepository performanceRepository, PerformanceMapper performanceMapper) {
        this.dateOfTourRepository = dateOfTourRepository;
        this.dateOfTourMapper = dateOfTourMapper;
        this.authorMapper = authorMapper;
        this.performanceRepository = performanceRepository;
        this.performanceMapper = performanceMapper;
    }

    public Page<DateOfTourDTO> getAllDateOfTours(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<DateOfTour> pagedResult = dateOfTourRepository.findAll(pageable);
        return pagedResult.map(dateOfTourMapper::toDTO);
    }

    public List<DateOfTourDTO> getAllDateOfToursList() {
        List<DateOfTour> dateOfTourList = dateOfTourRepository.findAll();
        return dateOfTourList.stream()
                .map(dateOfTourMapper::toDTO)
                .collect(Collectors.toList());
    }

    public DateOfTourDTO getDateOfTourById(Long id) {
        DateOfTour dateOfTour = dateOfTourRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DateOfTour not found with id: " + id));
        return dateOfTourMapper.toDTO(dateOfTour);
    }

    public DateOfTourDTO createDateOfTour(DateOfTourDTO dateOfTourDTO) {
        Performance performance = performanceRepository.findById(dateOfTourDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + dateOfTourDTO.getPerformance().getId()));

        dateOfTourDTO.setPerformance(performanceMapper.toDTO(performance));
        DateOfTour dateOfTour = dateOfTourMapper.toEntity(dateOfTourDTO);
        dateOfTour.setPerformance(performance);
        DateOfTour createdDateOfTour = dateOfTourRepository.save(dateOfTour);
        return dateOfTourMapper.toDTO(createdDateOfTour);
    }

    public DateOfTourDTO updateDateOfTour(Long id, DateOfTourDTO dateOfTourDTO) {
        DateOfTour existingDateOfTour = dateOfTourRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DateOfTour not found with id: " + id));
        Performance performance = performanceRepository.findById(dateOfTourDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + dateOfTourDTO.getPerformance().getId()));

        existingDateOfTour.setPerformance(performance);
        existingDateOfTour.setDate_start(dateOfTourDTO.getDateStart());
        existingDateOfTour.setDate_end(dateOfTourDTO.getDateEnd());

        DateOfTour savedDateOfTour = dateOfTourRepository.save(existingDateOfTour);
        return dateOfTourMapper.toDTO(savedDateOfTour);
    }

    public void deleteDateOfTour(Long id) {
        DateOfTour dateOfTour = dateOfTourRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DateOfTour not found with id: " + id));
        dateOfTourRepository.deleteById(id);
    }

    public List<ResponseEmployeeDateOfTourDTO> getEmployeeDateOfTour(EmployeeDateOfTourFilterDTO filterDTO) {
        List<Object[]> results = dateOfTourRepository.findByDateOfTourBetween(
                filterDTO.getDateOfTour().get(0),
                filterDTO.getDateOfTour().get(1)
        );

        List<ResponseEmployeeDateOfTourDTO> response = new ArrayList<>();
        for (Object[] result : results) {
            ResponseEmployeeDateOfTourDTO dto = new ResponseEmployeeDateOfTourDTO();
            dto.setPersonName((String) result[0]);
            dto.setRole((String) result[1]);
            dto.setTourStart((Date) result[2]);
            dto.setTourEnd((Date) result[3]);
            response.add(dto);
        }

        return response;
    }
}