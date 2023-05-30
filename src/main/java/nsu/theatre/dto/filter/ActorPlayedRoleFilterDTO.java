package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ActorPlayedRoleFilterDTO {
    private List<Long> actor;
    private List <Date> DateOfPlaying;
    private List<Long> genre;
    private List<Long> producer;
}