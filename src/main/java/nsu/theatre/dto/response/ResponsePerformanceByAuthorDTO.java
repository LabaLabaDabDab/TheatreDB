package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponsePerformanceByAuthorDTO {
    private String title;
    private String authorName;
    private String genre;
    private String country;
    private Date authorBirth;
    private Date authorDeath;
    private Date firstPerformanceDate;
}
