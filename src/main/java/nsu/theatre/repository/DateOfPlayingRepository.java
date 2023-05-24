package nsu.theatre.repository;

import nsu.theatre.entity.DateOfPlaying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateOfPlayingRepository extends JpaRepository<DateOfPlaying, Long> {
}