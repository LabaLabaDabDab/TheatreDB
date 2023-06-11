package nsu.theatre.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;
import nsu.theatre.entity.DateOfPlaying;
import nsu.theatre.entity.Performance;

@Data
public class TicketDTO {
    private Long id;
    private Short price;
    private DatePerformanceDTO datePerformance;
}
