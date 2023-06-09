package nsu.theatre.service;

import nsu.theatre.dto.GenderDTO;
import nsu.theatre.entity.Gender;
import nsu.theatre.entity.Genre;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.GenderMapper;
import nsu.theatre.repository.GenderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.List;

@Service
public class GenderService {
    private final GenderRepository genderRepository;
    private final GenderMapper genderMapper;

    public GenderService(GenderRepository genderRepository, GenderMapper genderMapper) {
        this.genderRepository = genderRepository;
        this.genderMapper = genderMapper;
    }

    public Page<GenderDTO> getAllGenders(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Gender> pagedResult = genderRepository.findAll(pageable);
        return pagedResult.map(genderMapper::toDTO);
    }

    public List<GenderDTO> getAllGendersList() {
        List<Gender> genderList = genderRepository.findAll();
        return genderList.stream()
                .map(genderMapper::toDTO)
                .collect(Collectors.toList());
    }

    public GenderDTO getGenderById(Long id) {
        Gender gender = genderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Gender not found with id: " + id));
        return genderMapper.toDTO(gender);
    }

    public GenderDTO createGender(GenderDTO genderDTO) {
        Gender gender = genderMapper.toEntity(genderDTO);
        Gender savedGender = genderRepository.save(gender);
        return genderMapper.toDTO(savedGender);
    }

    public GenderDTO updateGender(Long id, GenderDTO genderDTO) {
        Gender existingGender = genderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Gender not found with id: " + id));
        Gender updatedGender = genderMapper.toEntity(genderDTO);
        updatedGender.setType(genderDTO.getType());
        Gender savedGender = genderRepository.save(updatedGender);
        return genderMapper.toDTO(savedGender);
    }

    public void deleteGender(Long id) {
        Gender gender = genderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Gender not found with id: " + id));
        genderRepository.delete(gender);
    }
}