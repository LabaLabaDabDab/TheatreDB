package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PerformanceByAuthorFilterDTO {
    private List<Long> genre;
    private List<Long> author;
    private List<Long> country;
    private List<Long> century;
    private List<Date> datePerformance;
}
