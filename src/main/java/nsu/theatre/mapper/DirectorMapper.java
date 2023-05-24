package nsu.theatre.mapper;

import nsu.theatre.dto.DirectorDTO;
import nsu.theatre.entity.Director;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DirectorMapper {
    private final EmployeeMapper employeeMapper;

    @Autowired
    public DirectorMapper(EmployeeMapper employeeMapper) {
        this.employeeMapper = employeeMapper;
    }

    public DirectorDTO toDTO(Director director) {
        DirectorDTO directorDTO = new DirectorDTO();
        directorDTO.setId(director.getId());
        directorDTO.setEmployee(employeeMapper.toDTO(director.getEmployee()));

        return directorDTO;
    }

    public Director toEntity(DirectorDTO directorDTO) {
        Director director = new Director();
        director.setId(directorDTO.getId());
        director.setEmployee(employeeMapper.toEntity(directorDTO.getEmployee()));

        return director;
    }
}