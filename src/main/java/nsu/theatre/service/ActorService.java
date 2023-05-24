package nsu.theatre.service;

import nsu.theatre.dto.ActorDTO;
import nsu.theatre.entity.Actor;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.ActorMapper;
import nsu.theatre.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorService {
    private final ActorRepository actorRepository;
    private final ActorMapper actorMapper;

    @Autowired
    public ActorService(ActorRepository actorRepository, ActorMapper actorMapper) {
        this.actorRepository = actorRepository;
        this.actorMapper = actorMapper;
    }

    public List<ActorDTO> getAllActors() {
        List<Actor> actorsList = actorRepository.findAll();
        return actorsList.stream()
                .map(actorMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ActorDTO getActorById(Long id) {
        Actor actor = actorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Actor not found with id: " + id));
        return actorMapper.toDTO(actor);
    }

    public ActorDTO createActor(ActorDTO actorDTO) {
        Actor actor = actorMapper.toEntity(actorDTO);
        Actor savedActor = actorRepository.save(actor);
        return actorMapper.toDTO(savedActor);
    }

    public ActorDTO updateActor(Long id, ActorDTO actorDTO) {
        Actor existingActor = actorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Actor not found with id: " + id));
        Actor updatedActor = actorMapper.toEntity(actorDTO);
        updatedActor.setId(existingActor.getId());
        Actor savedActor = actorRepository.save(updatedActor);
        return actorMapper.toDTO(savedActor);
    }

    public void deleteActor(Long id) {
        Actor actor = actorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Actor not found with id: " + id));
        actorRepository.deleteById(id);
    }
}