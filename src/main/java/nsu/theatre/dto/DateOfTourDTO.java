package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.Performance;

import java.sql.Date;

@Data
public class DateOfTourDTO {
    private Long id;
    private Date dateStart;
    private Date dateEnd;
    private PerformanceDTO performance;
}
