package nsu.theatre.mapper;

import nsu.theatre.dto.ActorDTO;
import nsu.theatre.entity.Actor;
import org.springframework.stereotype.Component;

@Component
public class ActorMapper {
    private final EmployeeMapper employeeMapper;

    public ActorMapper(EmployeeMapper employeeMapper) {
        this.employeeMapper = employeeMapper;
    }

    public ActorDTO toDTO(Actor actor) {
        ActorDTO actorDTO = new ActorDTO();
        actorDTO.setId(actor.getId());
        actorDTO.setEmployee(employeeMapper.toDTO(actor.getEmployee()));
        actorDTO.setHeight(actor.getHeight());
        actorDTO.setStudent(actor.isStudent());

        return actorDTO;
    }

    public Actor toEntity(ActorDTO actorDTO) {
        Actor actor = new Actor();
        actor.setId(actorDTO.getId());
        actor.setEmployee(employeeMapper.toEntity(actorDTO.getEmployee()));
        actor.setHeight(actorDTO.getHeight());
        actor.setStudent(actorDTO.isStudent());

        return actor;
    }
}