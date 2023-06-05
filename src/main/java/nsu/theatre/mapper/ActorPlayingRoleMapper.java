package nsu.theatre.mapper;

import nsu.theatre.dto.ActorPlayingRoleDTO;
import nsu.theatre.entity.ActorPlayingRole;
import org.springframework.stereotype.Component;

@Component
public class ActorPlayingRoleMapper {

    private final RoleMapper roleMapper;
    private final ActorMapper actorMapper;

    public ActorPlayingRoleMapper(RoleMapper roleMapper, ActorMapper actorMapper) {
        this.roleMapper = roleMapper;
        this.actorMapper = actorMapper;
    }

    public ActorPlayingRoleDTO toDTO(ActorPlayingRole actorPlayingRole) {
        ActorPlayingRoleDTO actorPlayingRoleDTO = new ActorPlayingRoleDTO();
        actorPlayingRoleDTO.setId(actorPlayingRole.getId());
        actorPlayingRoleDTO.setRole(roleMapper.toDTO(actorPlayingRole.getRole()));
        actorPlayingRoleDTO.setActor(actorMapper.toDTO(actorPlayingRole.getActor()));
        actorPlayingRoleDTO.setMainRole(actorPlayingRole.getMain());
        actorPlayingRoleDTO.setDate(actorPlayingRole.getDate());

        return actorPlayingRoleDTO;
    }

    public ActorPlayingRole toEntity(ActorPlayingRoleDTO dto) {
        ActorPlayingRole actorPlayingRole = new ActorPlayingRole();
        actorPlayingRole.setId(dto.getId());
        actorPlayingRole.setRole(roleMapper.toEntity(dto.getRole()));
        actorPlayingRole.setActor(actorMapper.toEntity(dto.getActor()));
        actorPlayingRole.setMain(dto.getMainRole());
        actorPlayingRole.setDate(dto.getDate());

        return actorPlayingRole;
    }
}