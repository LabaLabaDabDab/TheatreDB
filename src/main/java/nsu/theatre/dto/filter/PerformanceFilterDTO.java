package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PerformanceFilterDTO {
    private List<Long> seasons;
    private List<Date> date_performances;
    private List<Long> genres;
}
