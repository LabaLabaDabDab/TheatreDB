package nsu.theatre.repository;

import nsu.theatre.entity.DatePerformanceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import nsu.theatre.entity.DatePerformance;

@Repository
public interface DatePerformanceRepository extends JpaRepository<DatePerformance, DatePerformanceId> {
}