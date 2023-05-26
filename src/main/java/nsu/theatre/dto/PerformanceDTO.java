package nsu.theatre.dto;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class PerformanceDTO {
    private Long id;
    private Long ageLimit;
    private Date premiereDate;
    private AuthorDTO author;
    private Long timeDuration;
    private DirectorDTO director;
    private MusicianDTO musician;
    private ProducerDTO producer;
}
