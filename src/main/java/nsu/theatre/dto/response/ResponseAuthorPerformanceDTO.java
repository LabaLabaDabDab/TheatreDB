package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseAuthorPerformanceDTO {
    private String name;
    private String title;
    private String country;
    private String genre;
    private Date birthDate;
    private Date deathDate;
    private Date date_perf;
}
