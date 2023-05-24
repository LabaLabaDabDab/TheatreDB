package nsu.theatre.controller;

import nsu.theatre.dto.ActorPlayingRoleDTO;
import nsu.theatre.service.ActorPlayingRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actor-playing-roles")
public class ActorPlayingRoleController {
    private final ActorPlayingRoleService actorPlayingRoleService;

    @Autowired
    public ActorPlayingRoleController(ActorPlayingRoleService actorPlayingRoleService) {
        this.actorPlayingRoleService = actorPlayingRoleService;
    }

    @GetMapping
    public ResponseEntity<List<ActorPlayingRoleDTO>> getAllActorPlayingRoles() {
        List<ActorPlayingRoleDTO> actorPlayingRolesList = actorPlayingRoleService.getAllActorPlayingRoles();
        return new ResponseEntity<>(actorPlayingRolesList, HttpStatus.OK);
    }

    @GetMapping("/{actorId}/{roleId}")
    public ResponseEntity<ActorPlayingRoleDTO> getActorPlayingRoleById(@PathVariable("actorId") Long actorId,
                                                                       @PathVariable("roleId") Long roleId) {
        ActorPlayingRoleDTO actorPlayingRoleDTO = actorPlayingRoleService.getActorPlayingRoleById(actorId, roleId);
        if (actorPlayingRoleDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(actorPlayingRoleDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ActorPlayingRoleDTO> createActorPlayingRole(@RequestBody ActorPlayingRoleDTO actorPlayingRoleDTO) {
        ActorPlayingRoleDTO createdActorPlayingRole = actorPlayingRoleService.createActorPlayingRole(actorPlayingRoleDTO);
        return new ResponseEntity<>(createdActorPlayingRole, HttpStatus.CREATED);
    }

    @PutMapping("/{actorId}/{roleId}")
    public ResponseEntity<ActorPlayingRoleDTO> updateActorPlayingRole(@PathVariable("actorId") Long actorId,
                                                                      @PathVariable("roleId") Long roleId,
                                                                      @RequestBody ActorPlayingRoleDTO actorPlayingRoleDTO) {
        ActorPlayingRoleDTO updatedActorPlayingRole = actorPlayingRoleService.updateActorPlayingRole(actorId, roleId, actorPlayingRoleDTO);
        if (updatedActorPlayingRole == null) {
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedActorPlayingRole, HttpStatus.OK);
    }

    @DeleteMapping("/{actorId}/{roleId}")
    public ResponseEntity<Void> deleteActorPlayingRole(@PathVariable("actorId") Long actorId,
                                                       @PathVariable("roleId") Long roleId) {
        actorPlayingRoleService.deleteActorPlayingRole(actorId, roleId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}