package nsu.theatre.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@Data
public class EmployeeDTO {
    private Long id;
    private EmployeeTypeDTO type;
    private String fio;
    private GenderDTO gender;
    private Date birthDate;
    private Long childrenAmount;
    private Long salary;
    private Date hireDate;
}