package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;

@Data
public class PerformanceFilterBySeasonDTO {
    private Long seasons;
    private Date date_performance_start;
    private Date date_performance_end;
    private Long genres;
}
