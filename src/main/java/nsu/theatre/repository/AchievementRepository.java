package nsu.theatre.repository;

import nsu.theatre.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    @Query("SELECT DISTINCT a.competition FROM Achievement a")
    List<String> findDistinctCompetition();

    @Query("SELECT DISTINCT a.rank FROM Achievement a")
    List<String> findDistinctRank();
}