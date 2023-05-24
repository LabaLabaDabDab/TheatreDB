package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.Employee;

@Data
public class ActorDTO {
    private Long id;
    private EmployeeDTO employee;
    private Long height;
    private boolean isStudent;
}
