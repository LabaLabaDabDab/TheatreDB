package nsu.theatre.mapper;

import nsu.theatre.dto.GenderDTO;
import nsu.theatre.entity.Gender;
import org.springframework.stereotype.Component;

@Component
public class GenderMapper {
    public GenderDTO toDTO(Gender gender) {
        GenderDTO genderDTO = new GenderDTO();
        genderDTO.setId(gender.getId());
        genderDTO.setType(gender.getType());
        return genderDTO;
    }

    public Gender toEntity(GenderDTO genderDTO) {
        Gender gender = new Gender();
        gender.setId(genderDTO.getId());
        gender.setType(genderDTO.getType());
        return gender;
    }
}