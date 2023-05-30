package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ActorAchievementFilterDTO {
    private List<Date> dateCompetition;
    private List<String> competition;
    private List<String> rank;
    private List<Long> gender;
    private List<Date> birthDate;
}
