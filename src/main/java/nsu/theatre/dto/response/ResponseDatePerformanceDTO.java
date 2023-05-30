package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseDatePerformanceDTO {
    private Long id;
    private Long season;
    private Date date_perf;
    private String name;
    private String title;
    private String genre;
}
