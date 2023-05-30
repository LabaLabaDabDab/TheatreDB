package nsu.theatre.service;

import nsu.theatre.dto.ActorDTO;
import nsu.theatre.dto.filter.ActorAchievementFilterDTO;
import nsu.theatre.dto.filter.ActorPlayedRoleFilterDTO;
import nsu.theatre.dto.response.ResponseActorAchievementDTO;
import nsu.theatre.dto.response.ResponseActorPlayedRoleDTO;
import nsu.theatre.dto.response.ResponseActorRoleDTO;
import nsu.theatre.entity.Actor;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.ActorMapper;
import nsu.theatre.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
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

    public List<ResponseActorRoleDTO> getAllActorRoles() {
        List<Object[]> results = actorRepository.getAllActorRoles();

        return results.stream()
                .map(result -> {
                    ResponseActorRoleDTO dto = new ResponseActorRoleDTO();
                    dto.setActorName((String) result[0]);
                    dto.setRoleName((String) result[1]);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<ResponseActorAchievementDTO> getFilteredActors(ActorAchievementFilterDTO filterDTO) {
        List<Object[]> results = actorRepository.findByFilter(
                filterDTO.getDateCompetition().get(0),
                filterDTO.getDateCompetition().get(1),
                filterDTO.getCompetition(),
                filterDTO.getRank(),
                filterDTO.getGender(),
                filterDTO.getBirthDate().get(0),
                filterDTO.getBirthDate().get(1)
        );
        List<ResponseActorAchievementDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponseActorAchievementDTO dto = new ResponseActorAchievementDTO();
            dto.setFio((String) result[0]);
            dto.setGender((String) result[1]);
            dto.setCompetition((String) result[2]);
            dto.setDateCompetition((Date) result[3]);
            dto.setRank((String) result[4]);
            dto.setBirthDate((Date) result[5]);
            dto.setTotalCount((Long) result[6]);
            response.add(dto);
        }

        return response;
    }

    public List<ResponseActorPlayedRoleDTO> getActorPlayedRoles(ActorPlayedRoleFilterDTO filterDTO) {
        List<Object[]> results = actorRepository.findActorPlayedRoleFilter(
                filterDTO.getActor(),
                filterDTO.getDateOfPlaying().get(0),
                filterDTO.getDateOfPlaying().get(1),
                filterDTO.getGenre(),
                filterDTO.getProducer()
        );

        List<ResponseActorPlayedRoleDTO> response = new ArrayList<>();
        for (Object[] result : results) {
            ResponseActorPlayedRoleDTO dto = new ResponseActorPlayedRoleDTO();
            dto.setActorName((String) result[0]);
            dto.setPlayedRole((String) result[1]);
            response.add(dto);
        }

        return response;
    }

    public Long getActorPlayedRoleCount(ActorPlayedRoleFilterDTO filterDTO) {
        Long results = actorRepository.getActorPlayedRoleCount(
                filterDTO.getActor(),
                filterDTO.getDateOfPlaying().get(0),
                filterDTO.getDateOfPlaying().get(1),
                filterDTO.getGenre(),
                filterDTO.getProducer()
        );

        return results;
    }
}