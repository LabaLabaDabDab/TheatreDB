package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.DatePerformance;

import java.sql.Date;
import java.util.List;

@Data
public class DateOfPlayingDTO {
    private Long id;
    private Date dateOfPerformance;
    private Long season;
    private Long ticketsCount;
    private Boolean isTour;
}
