package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class EmployeeFilterDTO {
    private List<Long> types;
    private List<Long> years;
    private List<Long> genders;
    private List<Date> birth_dates;
    private List<Long> amount_children;
    private List<Long> salary;
}
