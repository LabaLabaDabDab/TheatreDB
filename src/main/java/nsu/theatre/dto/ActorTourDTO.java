package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.ActorTourId;

@Data
public class ActorTourDTO {
    private ActorTourId id;
    private DateOfTourDTO date;
    private ActorDTO actor;
}