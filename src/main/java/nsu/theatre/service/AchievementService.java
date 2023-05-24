package nsu.theatre.service;

import nsu.theatre.dto.AchievementDTO;
import nsu.theatre.entity.Achievement;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.AchievementMapper;
import nsu.theatre.repository.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AchievementService {
    private final AchievementRepository achievementRepository;
    private final AchievementMapper achievementMapper;

    @Autowired
    public AchievementService(AchievementRepository achievementRepository, AchievementMapper achievementMapper) {
        this.achievementRepository = achievementRepository;
        this.achievementMapper = achievementMapper;
    }

    public List<AchievementDTO> getAllAchievements() {
        List<Achievement> achievements = achievementRepository.findAll();
        return achievements.stream()
                .map(achievementMapper::toDTO)
                .collect(Collectors.toList());
    }

    public AchievementDTO getAchievementById(Long id) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Achievement not found with id: " + id));
        return achievementMapper.toDTO(achievement);
    }

    public AchievementDTO createAchievement(AchievementDTO achievementDTO) {
        Achievement achievement = achievementMapper.toEntity(achievementDTO);
        Achievement createdAchievement = achievementRepository.save(achievement);
        return achievementMapper.toDTO(createdAchievement);
    }

    public AchievementDTO updateAchievement(Long id, AchievementDTO achievementDTO) {
        Achievement existingAchievement = achievementRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Achievement not found with id: " + id));
        Achievement updatedAchievement = achievementMapper.toEntity(achievementDTO);
        updatedAchievement.setId(existingAchievement.getId());
        Achievement savedAchievement = achievementRepository.save(updatedAchievement);
        return achievementMapper.toDTO(savedAchievement);
    }

    public void deleteAchievement(Long id) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Achievement not found with id: " + id));
        achievementRepository.deleteById(id);
    }
}