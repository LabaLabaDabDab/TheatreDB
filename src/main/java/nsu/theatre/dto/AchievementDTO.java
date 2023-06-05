package nsu.theatre.dto;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import nsu.theatre.entity.Actor;

import java.sql.Date;

@Data
public class AchievementDTO {
    private Long id;
    private Date dateCompetition;
    private String competition;
    private ActorDTO actorId;
    private String rank;
}
