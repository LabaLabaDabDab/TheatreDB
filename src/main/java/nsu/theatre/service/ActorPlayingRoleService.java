package nsu.theatre.service;

import nsu.theatre.dto.ActorPlayingRoleDTO;
import nsu.theatre.entity.ActorPlayingRole;
import nsu.theatre.entity.ActorRoleId;
import nsu.theatre.entity.DatePerformance;
import nsu.theatre.entity.DatePerformanceId;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.ActorMapper;
import nsu.theatre.mapper.ActorPlayingRoleMapper;
import nsu.theatre.mapper.RoleMapper;
import nsu.theatre.repository.ActorPlayingRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorPlayingRoleService {
    private final ActorPlayingRoleRepository actorPlayingRoleRepository;
    private final ActorPlayingRoleMapper actorPlayingRoleMapper;
    private final RoleMapper roleMapper;
    private final ActorMapper actorMapper;

    @Autowired
    public ActorPlayingRoleService(ActorPlayingRoleRepository actorPlayingRoleRepository, ActorPlayingRoleMapper actorPlayingRoleMapper, RoleMapper roleMapper, ActorMapper actorMapper) {
        this.actorPlayingRoleRepository = actorPlayingRoleRepository;
        this.actorPlayingRoleMapper = actorPlayingRoleMapper;
        this.roleMapper = roleMapper;
        this.actorMapper = actorMapper;
    }

    public List<ActorPlayingRoleDTO> getAllActorPlayingRoles() {
        List<ActorPlayingRole> actorPlayingRolesList = actorPlayingRoleRepository.findAll();
        return actorPlayingRolesList.stream()
                .map(actorPlayingRoleMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ActorPlayingRoleDTO getActorPlayingRoleById(Long actorId, Long roleId) {
        ActorRoleId id = new ActorRoleId(actorId, roleId);
        ActorPlayingRole actorPlayingRole = actorPlayingRoleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ActorPlayingRole not found with id: " + id));
        return actorPlayingRoleMapper.toDTO(actorPlayingRole);
    }

    public ActorPlayingRoleDTO createActorPlayingRole(ActorPlayingRoleDTO actorPlayingRoleDTO) {
        ActorPlayingRole actorPlayingRole = actorPlayingRoleMapper.toEntity(actorPlayingRoleDTO);
        ActorPlayingRole createdActorPlayingRole = actorPlayingRoleRepository.save(actorPlayingRole);
        return actorPlayingRoleMapper.toDTO(createdActorPlayingRole);
    }

    public ActorPlayingRoleDTO updateActorPlayingRole(Long actorId, Long roleId, ActorPlayingRoleDTO actorPlayingRoleDTO) {
        ActorRoleId id = new ActorRoleId(actorId, roleId);
        ActorPlayingRole existingActorPlayingRole = actorPlayingRoleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ActorPlayingRole not found with id: " + id));

        existingActorPlayingRole.setActor(actorMapper.toEntity(actorPlayingRoleDTO.getActor()));
        existingActorPlayingRole.setRole(roleMapper.toEntity(actorPlayingRoleDTO.getRole()));

        ActorPlayingRole updatedActorPlayingRole = actorPlayingRoleRepository.save(existingActorPlayingRole);
        return actorPlayingRoleMapper.toDTO(updatedActorPlayingRole);
    }

    public void deleteActorPlayingRole(Long actorId, Long roleId) {
        ActorRoleId id = new ActorRoleId(actorId, roleId);
        ActorPlayingRole existingActorPlayingRole = actorPlayingRoleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ActorPlayingRole not found with id: " + id));
        actorPlayingRoleRepository.delete(existingActorPlayingRole);
    }
}