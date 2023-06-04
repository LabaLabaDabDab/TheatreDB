package nsu.theatre.dto.response;

import lombok.Data;

@Data
public class ResponseFreeSeatsOnPremiereDTO {
    private String performanceTitle;
    private Long ticketNumberId;
}
