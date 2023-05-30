package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class EmployeeDateOfTourFilterDTO {
    private List<Date> dateOfTour;
}
