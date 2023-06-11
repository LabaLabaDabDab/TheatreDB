package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PerformanceFilterBySeasonDTO {
    private List<Long> seasons;
    private List<Date> date_performance;
    private List<Long> genres;
}
