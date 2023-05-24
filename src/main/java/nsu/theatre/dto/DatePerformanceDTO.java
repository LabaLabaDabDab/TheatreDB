package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.DatePerformanceId;

@Data
public class DatePerformanceDTO {
    private DatePerformanceId id;
    private DateOfPlayingDTO date;
    private PerformanceDTO performance;
}
