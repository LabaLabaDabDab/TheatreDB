package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseSoldTicketsOnPremiereCountDTO {
    private String performanceTitle;
    private Date premiereDate;
    private Long count;
}
