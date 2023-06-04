package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class SoldTicketsCountFilterDTO {
    private List<Long> performance;
    private List<Date> date_performance;
}
