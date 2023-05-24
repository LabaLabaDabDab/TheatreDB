package nsu.theatre.service;

import nsu.theatre.dto.DateOfTourDTO;
import nsu.theatre.entity.DateOfTour;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.DateOfTourMapper;
import nsu.theatre.repository.DateOfTourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DateOfTourService {
    private final DateOfTourRepository dateOfTourRepository;
    private final DateOfTourMapper dateOfTourMapper;

    @Autowired
    public DateOfTourService(DateOfTourRepository dateOfTourRepository, DateOfTourMapper dateOfTourMapper) {
        this.dateOfTourRepository = dateOfTourRepository;
        this.dateOfTourMapper = dateOfTourMapper;
    }

    public List<DateOfTourDTO> getAllDateOfTours() {
        List<DateOfTour> dateOfToursList = dateOfTourRepository.findAll();
        return dateOfToursList.stream()
                .map(dateOfTourMapper::toDTO)
                .collect(Collectors.toList());
    }

    public DateOfTourDTO getDateOfTourById(Long id) {
        DateOfTour dateOfTour = dateOfTourRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DateOfTour not found with id: " + id));
        return dateOfTourMapper.toDTO(dateOfTour);
    }

    public DateOfTourDTO createDateOfTour(DateOfTourDTO dateOfTourDTO) {
        DateOfTour dateOfTour = dateOfTourMapper.toEntity(dateOfTourDTO);
        DateOfTour savedDateOfTour = dateOfTourRepository.save(dateOfTour);
        return dateOfTourMapper.toDTO(savedDateOfTour);
    }

    public DateOfTourDTO updateDateOfTour(Long id, DateOfTourDTO dateOfTourDTO) {
        DateOfTour existingDateOfTour = dateOfTourRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DateOfTour not found with id: " + id));

        DateOfTour updatedDateOfTour = dateOfTourMapper.toEntity(dateOfTourDTO);
        updatedDateOfTour.setId(existingDateOfTour.getId());

        DateOfTour savedDateOfTour = dateOfTourRepository.save(updatedDateOfTour);
        return dateOfTourMapper.toDTO(savedDateOfTour);
    }

    public void deleteDateOfTour(Long id) {
        DateOfTour dateOfTour = dateOfTourRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DateOfTour not found with id: " + id));
        dateOfTourRepository.deleteById(id);
    }
}