package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.ActorRoleId;

import java.sql.Date;

@Data
public class ActorPlayingRoleDTO {
    private ActorRoleId id;
    private RoleDTO role;
    private ActorDTO actor;
    private Boolean main;
    private Date date;
}
