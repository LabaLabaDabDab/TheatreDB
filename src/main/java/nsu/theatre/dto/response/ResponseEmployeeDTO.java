package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseEmployeeDTO {
    private Long id;
    private String type;
    private String fio;
    private String gender;
    private Date birthDate;
    private Long amountChildren;
    private Long salary;
    private Date hireDate;
}