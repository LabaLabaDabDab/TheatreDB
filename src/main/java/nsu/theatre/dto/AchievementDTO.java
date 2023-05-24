package nsu.theatre.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class AchievementDTO {
    private Long id;
    private Date dateCompetition;
    private String title;
    private ActorDTO actor;
}
