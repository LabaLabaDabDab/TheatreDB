package nsu.theatre.service;

import nsu.theatre.dto.ActorPlayingRoleDTO;
import nsu.theatre.entity.*;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.ActorMapper;
import nsu.theatre.mapper.ActorPlayingRoleMapper;
import nsu.theatre.mapper.RoleMapper;
import nsu.theatre.repository.ActorPlayingRoleRepository;
import nsu.theatre.repository.ActorRepository;
import nsu.theatre.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorPlayingRoleService {
    private final ActorPlayingRoleRepository actorPlayingRoleRepository;
    private final ActorPlayingRoleMapper actorPlayingRoleMapper;
    private final RoleMapper roleMapper;
    private final ActorMapper actorMapper;
    private final RoleRepository roleRepository;
    private final ActorRepository actorRepository;

    @Autowired
    public ActorPlayingRoleService(ActorPlayingRoleRepository actorPlayingRoleRepository, ActorPlayingRoleMapper actorPlayingRoleMapper, RoleMapper roleMapper, ActorMapper actorMapper, RoleRepository roleRepository, ActorRepository actorRepository) {
        this.actorPlayingRoleRepository = actorPlayingRoleRepository;
        this.actorPlayingRoleMapper = actorPlayingRoleMapper;
        this.roleMapper = roleMapper;
        this.actorMapper = actorMapper;
        this.roleRepository = roleRepository;
        this.actorRepository = actorRepository;
    }

    public Page<ActorPlayingRoleDTO> getAllActorPlayingRoles(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ActorPlayingRole> pagedResult = actorPlayingRoleRepository.findAll(pageable);
        return pagedResult.map(actorPlayingRoleMapper::toDTO);
    }

    public List<ActorPlayingRoleDTO> getAllActorPlayingRolesList() {
        List<ActorPlayingRole> actorPlayingRoleList = actorPlayingRoleRepository.findAll();
        return actorPlayingRoleList.stream()
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
        Role role = roleRepository.findById(actorPlayingRoleDTO.getRole().getId())
                .orElseThrow(() -> new NotFoundException("role not found with id: " + actorPlayingRoleDTO.getRole().getId()));
        Actor actor = actorRepository.findById(actorPlayingRoleDTO.getActor().getId())
                .orElseThrow(() -> new NotFoundException("actor not found with id: " + actorPlayingRoleDTO.getActor().getId()));

        actorPlayingRoleDTO.setRole(roleMapper.toDTO(role));
        actorPlayingRoleDTO.setActor(actorMapper.toDTO(actor));

        ActorPlayingRole actorPlayingRole = actorPlayingRoleMapper.toEntity(actorPlayingRoleDTO);
        actorPlayingRole.setRole(role);
        actorPlayingRole.setActor(actor);
        ActorPlayingRole createdActorPlayingRole = actorPlayingRoleRepository.save(actorPlayingRole);

        return actorPlayingRoleMapper.toDTO(createdActorPlayingRole);
    }

    public ActorPlayingRoleDTO updateActorPlayingRole(Long actorId, Long roleId, ActorPlayingRoleDTO actorPlayingRoleDTO) {
        ActorRoleId id = new ActorRoleId(actorId, roleId);
        ActorPlayingRole existingActorPlayingRole = actorPlayingRoleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ActorPlayingRole not found with id: " + id));

        actorPlayingRoleRepository.deleteById(id);

        ActorRoleId newId = new ActorRoleId(actorPlayingRoleDTO.getActor().getId(), actorPlayingRoleDTO.getRole().getId());

        Role role = roleRepository.findById(actorPlayingRoleDTO.getRole().getId())
                .orElseThrow(() -> new NotFoundException("role not found with id: " + actorPlayingRoleDTO.getRole().getId()));
        Actor actor = actorRepository.findById(actorPlayingRoleDTO.getActor().getId())
                .orElseThrow(() -> new NotFoundException("actor not found with id: " + actorPlayingRoleDTO.getActor().getId()));

        ActorPlayingRole newActorPlayingRole = new ActorPlayingRole();
        newActorPlayingRole.setId(newId);
        newActorPlayingRole.setRole(role);
        newActorPlayingRole.setActor(actor);
        newActorPlayingRole.setMain(actorPlayingRoleDTO.getMainRole());
        newActorPlayingRole.setDate(actorPlayingRoleDTO.getDate());

        ActorPlayingRole updatedActorPlayingRole = actorPlayingRoleRepository.save(newActorPlayingRole);
        return actorPlayingRoleMapper.toDTO(updatedActorPlayingRole);
    }


    public void deleteActorPlayingRole(Long actorId, Long roleId) {
        ActorRoleId id = new ActorRoleId(actorId, roleId);
        ActorPlayingRole existingActorPlayingRole = actorPlayingRoleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ActorPlayingRole not found with id: " + id));
        actorPlayingRoleRepository.delete(existingActorPlayingRole);
    }
}