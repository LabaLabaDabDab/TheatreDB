package nsu.theatre.repository;

import nsu.theatre.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    @Query(nativeQuery = true, value = """
                                       SELECT
                                                p.id AS performance_id,
                                                a.title AS title,
                                                dop.date_of_performance AS date_of_performance,
                                                g.name AS genre_name,
                                                COUNT(*) OVER () AS total_count
                                        FROM performances p
                                        INNER JOIN date_performance dp ON p.id = dp.performance_id
                                        INNER JOIN date_of_playing dop ON dop.id = dp.date_id
                                        INNER JOIN authors a ON p.author_id = a.id
                                        INNER JOIN genres g ON a.genre_id = g.id
                                        WHERE
                                            dop.season IN ?1
                                            AND dop.date_of_performance BETWEEN ?2 AND ?3
                                            AND g.id IN ?4
                                       """
    )
    public List<Performance> findByFilter(List<Long> seasons,
                                          Date date_performances_start,
                                          Date date_performances_end,
                                          List<Long> genres
    );
}
