package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponsePerformanceDetailsDTO {
    private String actorName;
    private String producerName;
    private String musicianName;
    private String directorName;
    private String authorName;
    private Date premiereDate;
}
