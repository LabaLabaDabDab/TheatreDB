package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseEmployeeDateOfTourDTO {
    private String personName;
    private String role;
    private Date tourStart;
    private Date tourEnd;
}
