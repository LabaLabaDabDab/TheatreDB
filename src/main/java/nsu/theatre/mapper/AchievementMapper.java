package nsu.theatre.mapper;

import nsu.theatre.dto.AchievementDTO;
import nsu.theatre.entity.Achievement;
import org.springframework.stereotype.Component;

@Component
public class AchievementMapper {
    private final ActorMapper actorMapper;

    public AchievementMapper(ActorMapper actorMapper) {
        this.actorMapper = actorMapper;
    }

    public AchievementDTO toDTO(Achievement achievement) {
        AchievementDTO achievementDTO = new AchievementDTO();
        achievementDTO.setId(achievement.getId());
        achievementDTO.setDateCompetition(achievement.getDateCompetition());
        achievementDTO.setCompetition(achievement.getCompetition());
        achievementDTO.setActor(actorMapper.toDTO(achievement.getActor()));
        achievementDTO.setRank(achievement.getRank());

        return achievementDTO;
    }

    public Achievement toEntity(AchievementDTO achievementDTO) {
        Achievement achievement = new Achievement();
        achievement.setId(achievementDTO.getId());
        achievement.setDateCompetition(achievementDTO.getDateCompetition());
        achievement.setCompetition(achievementDTO.getCompetition());
        achievement.setActor(actorMapper.toEntity(achievementDTO.getActor()));
        achievementDTO.setRank(achievementDTO.getRank());

        return achievement;
    }
}