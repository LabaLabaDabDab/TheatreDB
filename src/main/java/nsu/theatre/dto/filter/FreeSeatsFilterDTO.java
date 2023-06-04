package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.List;

@Data
public class FreeSeatsFilterDTO {
    private List<Long> performance;
}
