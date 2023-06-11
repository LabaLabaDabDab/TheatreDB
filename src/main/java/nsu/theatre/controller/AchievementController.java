package nsu.theatre.controller;

import nsu.theatre.dto.AchievementDTO;
import nsu.theatre.dto.AchievementUniqueDTO;
import nsu.theatre.entity.Achievement;
import nsu.theatre.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/achievements")
public class AchievementController {
    private final AchievementService achievementService;

    @Autowired
    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping
    public ResponseEntity<Page<AchievementDTO>> getAllAchievements(@RequestParam(defaultValue = "1") Integer pageNo,
                                                                   @RequestParam(defaultValue = "5") Integer pageSize) {
        Page<AchievementDTO> page = achievementService.getAllAchievements(pageNo, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<AchievementDTO>> getAllAchievementsList() {
        List<AchievementDTO> achievements = achievementService.getAllAchievementsList();
        return new ResponseEntity<>(achievements, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AchievementDTO> getAchievementById(@PathVariable("id") Long id) {
        AchievementDTO achievement = achievementService.getAchievementById(id);
        if (achievement == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(achievement, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AchievementDTO> createAchievement(@RequestBody AchievementDTO achievementDTO) {
        AchievementDTO createdAchievement = achievementService.createAchievement(achievementDTO);
        return new ResponseEntity<>(createdAchievement, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AchievementDTO> updateAchievement(@PathVariable("id") Long id, @RequestBody AchievementDTO achievementDTO) {
        AchievementDTO updatedAchievement = achievementService.updateAchievement(id, achievementDTO);
        if (updatedAchievement == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedAchievement, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable("id") Long id) {
        achievementService.deleteAchievement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/unique")
    public ResponseEntity<AchievementUniqueDTO> getUniqueAchievements() {
        List<String> competitions = achievementService.getUniqueCompetitions();
        List<String> ranks = achievementService.getUniqueRanks();

        AchievementUniqueDTO uniqueAchievements = new AchievementUniqueDTO();
        uniqueAchievements.setCompetitions(competitions);
        uniqueAchievements.setRanks(ranks);

        return new ResponseEntity<>(uniqueAchievements, HttpStatus.OK);
    }
}