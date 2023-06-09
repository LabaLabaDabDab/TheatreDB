package nsu.theatre.controller;

import nsu.theatre.dto.ActorTourDTO;
import nsu.theatre.service.ActorTourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/actor-tours")
public class ActorTourController {
    private final ActorTourService actorTourService;

    @Autowired
    public ActorTourController(ActorTourService actorTourService) {
        this.actorTourService = actorTourService;
    }

    @GetMapping
    public ResponseEntity<Page<ActorTourDTO>> getAllActorTours(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize) {
        Page<ActorTourDTO> page = actorTourService.getAllActorTours(pageNo, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }
    @GetMapping("/list")
    public ResponseEntity<List<ActorTourDTO>> getAllActorToursList() {
        List<ActorTourDTO> actorTourList = actorTourService.getAllActorToursList();
        return new ResponseEntity<>(actorTourList, HttpStatus.OK);
    }


    @GetMapping("/{actorId}/{dateOfTourId}")
    public ResponseEntity<ActorTourDTO> getActorTourById(@PathVariable("actorId") Long actorId,
                                                         @PathVariable("dateOfTourId") Long dateOfTourId) {
        ActorTourDTO actorTourDTO = actorTourService.getActorTourById(actorId, dateOfTourId);
        if (actorTourDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(actorTourDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ActorTourDTO> createActorTour(@RequestBody ActorTourDTO actorTourDTO) {
        ActorTourDTO createdActorTour = actorTourService.createActorTour(actorTourDTO);
        return new ResponseEntity<>(createdActorTour, HttpStatus.CREATED);
    }

    @PutMapping("/{actorId}/{dateOfTourId}")
    public ResponseEntity<ActorTourDTO> updateActorTour(@PathVariable("actorId") Long actorId,
                                                        @PathVariable("dateOfTourId") Long dateOfTourId,
                                                        @RequestBody ActorTourDTO actorTourDTO) {
        ActorTourDTO updatedActorTour = actorTourService.updateActorTour(actorId, dateOfTourId, actorTourDTO);
        if (updatedActorTour == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedActorTour, HttpStatus.OK);
    }

    @DeleteMapping("/{actorId}/{dateOfTourId}")
    public ResponseEntity<Void> deleteActorTour(@PathVariable("actorId") Long actorId,
                                                @PathVariable("dateOfTourId") Long dateOfTourId) {
        actorTourService.deleteActorTour(actorId, dateOfTourId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}