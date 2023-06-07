package nsu.theatre.service;

import nsu.theatre.dto.AchievementDTO;
import nsu.theatre.entity.Achievement;
import nsu.theatre.entity.Actor;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.AchievementMapper;
import nsu.theatre.mapper.EmployeeMapper;
import nsu.theatre.repository.AchievementRepository;
import nsu.theatre.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AchievementService {
    private final AchievementRepository achievementRepository;
    private final AchievementMapper achievementMapper;
    private final ActorRepository actorRepository;
    private final EmployeeMapper employeeMapper;

    @Autowired
    public AchievementService(AchievementRepository achievementRepository, AchievementMapper achievementMapper, ActorRepository actorRepository, EmployeeMapper employeeMapper) {
        this.achievementRepository = achievementRepository;
        this.achievementMapper = achievementMapper;
        this.actorRepository = actorRepository;
        this.employeeMapper = employeeMapper;
    }

    public Page<AchievementDTO> getAllAchievements(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Achievement> pagedResult = achievementRepository.findAll(pageable);
        return pagedResult.map(achievementMapper::toDTO);
    }

    public List<AchievementDTO> getAllAchievementsList() {
        List<Achievement> achievementList = achievementRepository.findAll();
        return achievementList.stream()
                .map(achievementMapper::toDTO)
                .collect(Collectors.toList());
    }

    public AchievementDTO getAchievementById(Long id) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Achievement not found with id: " + id));
        return achievementMapper.toDTO(achievement);
    }

    public AchievementDTO createAchievement(AchievementDTO achievementDTO) {
        Actor actor = actorRepository.findById(achievementDTO.getActorId().getId())
                .orElseThrow(() -> new NotFoundException("Actor not found with id: " + achievementDTO.getActorId().getId()));

        achievementDTO.getActorId().setEmployee(employeeMapper.toDTO(actor.getEmployee()));
        achievementDTO.getActorId().setHeight(actor.getHeight());
        achievementDTO.getActorId().setStudent(actor.isStudent());
        Achievement achievement = achievementMapper.toEntity(achievementDTO);
        achievement.setActor(actor);
        Achievement createdAchievement = achievementRepository.save(achievement);
        return achievementMapper.toDTO(createdAchievement);
    }


    public AchievementDTO updateAchievement(Long id, AchievementDTO achievementDTO) {
        Achievement existingAchievement = achievementRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Achievement not found with id: " + id));
        Actor actor = actorRepository.findById(achievementDTO.getActorId().getId())
                .orElseThrow(() -> new NotFoundException("Actor not found with id: " + achievementDTO.getActorId().getId()));
        existingAchievement.setActor(actor);
        existingAchievement.setDateCompetition(achievementDTO.getDateCompetition());
        existingAchievement.setCompetition(achievementDTO.getCompetition());
        existingAchievement.setRank(achievementDTO.getRank());

        Achievement savedAchievement = achievementRepository.save(existingAchievement);
        return achievementMapper.toDTO(savedAchievement);
    }

    public void deleteAchievement(Long id) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Achievement not found with id: " + id));
        achievementRepository.deleteById(id);
    }
}