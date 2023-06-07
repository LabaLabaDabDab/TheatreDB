package nsu.theatre.service;

import nsu.theatre.dto.DateOfPlayingDTO;
import nsu.theatre.entity.DateOfPlaying;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.DateOfPlayingMapper;
import nsu.theatre.repository.DateOfPlayingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DateOfPlayingService {
    private final DateOfPlayingRepository dateOfPlayingRepository;
    private final DateOfPlayingMapper dateOfPlayingMapper;

    public DateOfPlayingService(DateOfPlayingRepository dateOfPlayingRepository, DateOfPlayingMapper dateOfPlayingMapper) {
        this.dateOfPlayingRepository = dateOfPlayingRepository;
        this.dateOfPlayingMapper = dateOfPlayingMapper;
    }

    public Page<DateOfPlayingDTO> getAllDateOfPlaying(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<DateOfPlaying> pagedResult = dateOfPlayingRepository.findAll(pageable);
        return pagedResult.map(dateOfPlayingMapper::toDTO);
    }

    public List<DateOfPlayingDTO> getAllDateOfPlayingList() {
        List<DateOfPlaying> dateOfPlayingList = dateOfPlayingRepository.findAll();
        return dateOfPlayingList.stream()
                .map(dateOfPlayingMapper::toDTO)
                .collect(Collectors.toList());
    }


    public DateOfPlayingDTO getDateOfPlayingById(Long id) {
        DateOfPlaying dateOfPlaying = dateOfPlayingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DateOfPlaying not found with id: " + id));
        return dateOfPlayingMapper.toDTO(dateOfPlaying);
    }

    public DateOfPlayingDTO createDateOfPlaying(DateOfPlayingDTO dateOfPlayingDTO) {
        DateOfPlaying dateOfPlaying = dateOfPlayingMapper.toEntity(dateOfPlayingDTO);
        DateOfPlaying savedDateOfPlaying = dateOfPlayingRepository.save(dateOfPlaying);
        return dateOfPlayingMapper.toDTO(savedDateOfPlaying);
    }

    public DateOfPlayingDTO updateDateOfPlaying(Long id, DateOfPlayingDTO dateOfPlayingDTO) {
        DateOfPlaying existingDateOfPlaying = dateOfPlayingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DateOfPlaying not found"));

        DateOfPlaying updatedDateOfPlaying = dateOfPlayingMapper.toEntity(dateOfPlayingDTO);
        updatedDateOfPlaying.setId(existingDateOfPlaying.getId());

        DateOfPlaying savedDateOfPlaying = dateOfPlayingRepository.save(updatedDateOfPlaying);
        return dateOfPlayingMapper.toDTO(savedDateOfPlaying);
    }

    public void deleteDateOfPlaying(Long id) {
        DateOfPlaying dateOfPlaying = dateOfPlayingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("DateOfPlaying not found with id: " + id));
        dateOfPlayingRepository.deleteById(id);
    }
}