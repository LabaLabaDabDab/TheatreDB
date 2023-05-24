package nsu.theatre.mapper;

import nsu.theatre.dto.ActorTourDTO;
import nsu.theatre.entity.ActorTour;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ActorTourMapper {
    private final DateOfTourMapper dateOfTourMapper;
    private final ActorMapper actorMapper;

    public ActorTourMapper(DateOfTourMapper dateOfTourMapper, ActorMapper actorMapper) {
        this.dateOfTourMapper = dateOfTourMapper;
        this.actorMapper = actorMapper;
    }

    public ActorTourDTO toDTO(ActorTour actorTour) {
        ActorTourDTO actorTourDTO = new ActorTourDTO();
        actorTourDTO.setId(actorTour.getId());
        actorTourDTO.setDate(dateOfTourMapper.toDTO(actorTour.getDate()));
        actorTourDTO.setActor(actorMapper.toDTO(actorTour.getActor()));

        return actorTourDTO;
    }

    public ActorTour toEntity(ActorTourDTO actorTourDTO) {
        ActorTour actorTour = new ActorTour();
        actorTour.setId(actorTourDTO.getId());
        actorTour.setDate(dateOfTourMapper.toEntity(actorTourDTO.getDate()));
        actorTour.setActor(actorMapper.toEntity(actorTourDTO.getActor()));

        return actorTour;
    }
}