package nsu.theatre.repository;

import nsu.theatre.entity.DateOfTour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateOfTourRepository extends JpaRepository<DateOfTour, Long> {
}
