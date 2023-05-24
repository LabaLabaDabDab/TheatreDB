package nsu.theatre.controller;


import nsu.theatre.dto.ActorDTO;
import nsu.theatre.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actors")
public class ActorController {
    private final ActorService actorService;

    @Autowired
    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @GetMapping
    public ResponseEntity<List<ActorDTO>> getAllActors() {
        List<ActorDTO> actors = actorService.getAllActors();
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
}