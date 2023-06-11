package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseActorAchievementDTO {
    private String fio;
    private String gender;
    private String competition;
    private Date dateCompetition;
    private String rank;
    private Date birthDate;
}
