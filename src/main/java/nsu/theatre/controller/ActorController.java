package nsu.theatre.controller;


import nsu.theatre.dto.ActorDTO;
import nsu.theatre.dto.filter.ActorAchievementFilterDTO;
import nsu.theatre.dto.filter.ActorPlayedRoleFilterDTO;
import nsu.theatre.dto.response.ResponseActorAchievementDTO;
import nsu.theatre.dto.response.ResponseActorPlayedRoleDTO;
import nsu.theatre.dto.response.ResponseActorRoleDTO;
import nsu.theatre.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/actors")
public class ActorController {
    private final ActorService actorService;

    @Autowired
    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @GetMapping
    public ResponseEntity<Page<ActorDTO>> getAllActors(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize) {
        Page<ActorDTO> page = actorService.getAllActors(pageNo, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ActorDTO>> getAllActorsList() {
        List<ActorDTO> actors = actorService.getAllActorsList();
        return new ResponseEntity<>(actors, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ActorDTO> getActorById(@PathVariable("id") Long id) {
        ActorDTO actorDTO = actorService.getActorById(id);
        if (actorDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(actorDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ActorDTO> createActor(@RequestBody ActorDTO actorDTO) {
        ActorDTO createdActor = actorService.createActor(actorDTO);
        return new ResponseEntity<>(createdActor, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActorDTO> updateActor(@PathVariable("id") Long id, @RequestBody ActorDTO actorDTO) {
        ActorDTO updatedActor = actorService.updateActor(id, actorDTO);
        if (updatedActor == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedActor, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActor(@PathVariable("id") Long id) {
        actorService.deleteActor(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/matching-roles")
    public List<ResponseActorRoleDTO> getAllActorRoles() {
        return actorService.getAllActorRoles();
    }

    @PostMapping("/filteredByAchievement")
    public List<ResponseActorAchievementDTO> getFilteredActors(@RequestBody ActorAchievementFilterDTO filterDTO) {
        return actorService.getFilteredActors(filterDTO);
    }

    @PostMapping("/filteredByAchievement/count")
    public ResponseEntity<Long> getCountilteredActors(@RequestBody ActorAchievementFilterDTO filterDTO) {
        Long count = actorService.getCount(filterDTO);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @PostMapping("/search-roles")
    public ResponseEntity<List<ResponseActorPlayedRoleDTO>> searchActorPlayedRoles(@RequestBody ActorPlayedRoleFilterDTO filterDTO) {
        List<ResponseActorPlayedRoleDTO> roles = actorService.getActorPlayedRoles(filterDTO);
        return ResponseEntity.ok(roles);
    }

    @PostMapping("/search-roles/count")
    public ResponseEntity<Long> getActorPlayedRoleCount(@RequestBody ActorPlayedRoleFilterDTO filterDTO) {
        Long count = actorService.getActorPlayedRoleCount(filterDTO);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}