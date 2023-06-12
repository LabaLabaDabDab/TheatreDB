package nsu.theatre.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseActorPlayedRoleDTO {
    private String actorName;
    private String roleName;
    private String performanceTitle;
    private String genre;
    private Integer ageLimit;
    private Date dateOfPerformance;
    private String producerName;
}
