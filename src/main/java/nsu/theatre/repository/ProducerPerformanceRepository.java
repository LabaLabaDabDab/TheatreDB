package nsu.theatre.repository;

import nsu.theatre.entity.ProducerPerformance;
import nsu.theatre.entity.ProducerPerformanceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProducerPerformanceRepository extends JpaRepository<ProducerPerformance, ProducerPerformanceId> {
}
