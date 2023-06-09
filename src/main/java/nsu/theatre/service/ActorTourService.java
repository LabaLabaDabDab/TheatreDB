package nsu.theatre.service;

import nsu.theatre.dto.ActorTourDTO;
import nsu.theatre.entity.Actor;
import nsu.theatre.entity.ActorTour;
import nsu.theatre.entity.ActorTourId;
import nsu.theatre.entity.DateOfTour;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.ActorMapper;
import nsu.theatre.mapper.ActorTourMapper;
import nsu.theatre.mapper.DateOfTourMapper;
import nsu.theatre.repository.ActorRepository;
import nsu.theatre.repository.ActorTourRepository;
import nsu.theatre.repository.DateOfTourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorTourService {
    private final ActorTourRepository actorTourRepository;
    private final ActorTourMapper actorTourMapper;
    private final DateOfTourMapper dateOfTourMapper;
    private final ActorMapper actorMapper;
    private final DateOfTourRepository dateOfTourRepository;
    private final ActorRepository actorRepository;

    @Autowired
    public ActorTourService(ActorTourRepository actorTourRepository, ActorTourMapper actorTourMapper,
                            DateOfTourMapper dateOfTourMapper, ActorMapper actorMapper, DateOfTourRepository dateOfTourRepository, ActorRepository actorRepository) {
        this.actorTourRepository = actorTourRepository;
        this.actorTourMapper = actorTourMapper;
        this.dateOfTourMapper = dateOfTourMapper;
        this.actorMapper = actorMapper;
        this.dateOfTourRepository = dateOfTourRepository;
        this.actorRepository = actorRepository;
    }

    public Page<ActorTourDTO> getAllActorTours(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ActorTour> pagedResult = actorTourRepository.findAll(pageable);
        return pagedResult.map(actorTourMapper::toDTO);
    }

    public List<ActorTourDTO> getAllActorToursList() {
        List<ActorTour> actorTourList = actorTourRepository.findAll();
        return actorTourList.stream()
                .map(actorTourMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ActorTourDTO getActorTourById(Long actorId, Long dateOfTourId) {
        ActorTourId id = new ActorTourId(actorId, dateOfTourId);
        ActorTour actorTour = actorTourRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ActorTour not found with id: " + id));
        return actorTourMapper.toDTO(actorTour);
    }

    public ActorTourDTO createActorTour(ActorTourDTO actorTourDTO) {
        DateOfTour dateOfTour = dateOfTourRepository.findById(actorTourDTO.getDate().getId())
                .orElseThrow(() -> new NotFoundException("dateOfTour not found with id: " + actorTourDTO.getDate().getId()));
        Actor actor = actorRepository.findById(actorTourDTO.getActor().getId())
                .orElseThrow(() -> new NotFoundException("actor not found with id: " + actorTourDTO.getActor().getId()));

        actorTourDTO.setDate(dateOfTourMapper.toDTO(dateOfTour));
        actorTourDTO.setActor(actorMapper.toDTO(actor));

        ActorTour actorTour = actorTourMapper.toEntity(actorTourDTO);
        actorTour.setDate(dateOfTour);
        actorTour.setActor(actor);
        ActorTour createdActorTour = actorTourRepository.save(actorTour);

        return actorTourMapper.toDTO(createdActorTour);
    }

    public ActorTourDTO updateActorTour(Long actorId, Long dateOfTourId, ActorTourDTO actorTourDTO) {
        ActorTourId id = new ActorTourId(actorId, dateOfTourId);
        ActorTour existingActorTour = actorTourRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ActorTour not found with id: " + id));

        actorTourRepository.deleteById(id);

        ActorTourId newId = new ActorTourId(actorTourDTO.getDate().getId(), actorTourDTO.getActor().getId());

        DateOfTour dateOfTour = dateOfTourRepository.findById(actorTourDTO.getDate().getId())
                .orElseThrow(() -> new NotFoundException("dateOfTour not found with id: " + actorTourDTO.getDate().getId()));
        Actor actor = actorRepository.findById(actorTourDTO.getActor().getId())
                .orElseThrow(() -> new NotFoundException("actor not found with id: " + actorTourDTO.getActor().getId()));

        ActorTour newActorTour = new ActorTour();
        newActorTour.setId(newId);
        newActorTour.setDate(dateOfTour);
        newActorTour.setActor(actor);

        ActorTour updatedActorTour = actorTourRepository.save(newActorTour);
        return actorTourMapper.toDTO(updatedActorTour);
    }

    public void deleteActorTour(Long actorId, Long dateOfTourId) {
        ActorTourId id = new ActorTourId(actorId, dateOfTourId);
        ActorTour existingActorTour = actorTourRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ActorTour not found with id: " + id));
        actorTourRepository.delete(existingActorTour);
    }
}