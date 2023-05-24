package nsu.theatre.service;

import nsu.theatre.dto.GenderDTO;
import nsu.theatre.entity.Gender;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.GenderMapper;
import nsu.theatre.repository.GenderRepository;
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

    public List<GenderDTO> getAllGenders() {
        List<Gender> genders = genderRepository.findAll();
        return genders.stream()
                .map(genderMapper::toDTO)
                .collect(Collectors.toList());
    }

    public GenderDTO getGenderById(Long id) {
        Gender gender = genderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Gender not found with id: " + id));
        return genderMapper.toDTO(gender);
    }
}