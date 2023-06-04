package nsu.theatre.dto.response;

import lombok.Data;

@Data
public class ResponseTotalFreeSeatsOnPremiereDTO {
    private String performanceTitle;
    private Long totalFreeSeats;
}
