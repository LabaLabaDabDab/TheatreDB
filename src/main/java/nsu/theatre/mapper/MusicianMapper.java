package nsu.theatre.mapper;

import nsu.theatre.dto.MusicianDTO;
import nsu.theatre.entity.Musician;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MusicianMapper {
    private final EmployeeMapper employeeMapper;

    @Autowired
    public MusicianMapper(EmployeeMapper employeeMapper) {
        this.employeeMapper = employeeMapper;
    }

    public MusicianDTO toDTO(Musician musician) {
        MusicianDTO musicianDTO = new MusicianDTO();
        musicianDTO.setId(musician.getId());
        musicianDTO.setEmployee(employeeMapper.toDTO(musician.getEmployee()));

        return musicianDTO;
    }

    public Musician toEntity(MusicianDTO musicianDTO) {
        Musician musician = new Musician();
        musician.setId(musicianDTO.getId());
        musician.setEmployee(employeeMapper.toEntity(musicianDTO.getEmployee()));

        return musician;
    }
}