package nsu.theatre.dto;

import lombok.Data;

import java.util.List;

@Data
public class AchievementUniqueDTO {
    private List<String> competitions;
    private List<String> ranks;
}
