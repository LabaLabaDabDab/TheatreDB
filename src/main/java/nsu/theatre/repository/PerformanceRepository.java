package nsu.theatre.repository;

import nsu.theatre.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    //5 запрос
    //Получить перечень спектаклей указанного жанpа, некоторого автоpа, автоpов обозначенной стpаны,
    //спектаклей, написанных в определенном веке, впеpвые поставленных на сцене указанного театpа в обозначенный пеpиод вpемени.
    @Query(nativeQuery = true, value = """
    SELECT DISTINCT
        a.name AS author_name,
        a.title AS title,
        g.name AS genre,
        c.name AS country,
        a.birth_date AS author_birth_Date,
        a.death_date AS author_death_date,
        MIN(d.date_of_performance) as first_performance_date
    FROM performances p
        INNER JOIN authors a ON a.id = p.author_id
        INNER JOIN date_performance dp ON p.id = dp.performance_id
        INNER JOIN date_of_playing d ON dp.date_id = d.id
        INNER JOIN genres g ON a.genre_id = g.id
        INNER JOIN countries c ON a.country_id = c.id
    WHERE
        g.id IN (:genres)
        AND a.id IN (:authors)
        AND c.id IN (:countries)
        AND ((EXTRACT(CENTURY FROM a.birth_date) BETWEEN :minCentury AND :maxCentury)
             OR (EXTRACT(CENTURY FROM a.death_date) BETWEEN :minCentury AND :maxCentury))
        AND d.date_of_performance BETWEEN :minPerformanceDate AND :maxPerformanceDate
    GROUP BY
        a.name, a.title, g.name, c.name, a.birth_date, a.death_date
    """)
    List<Object[]> findByFilter(
            @Param("genres") List<Long> genres,
            @Param("authors") List<Long> authors,
            @Param("countries") List<Long> countries,
            @Param("minCentury") Long minCentury,
            @Param("maxCentury") Long maxCentury,
            @Param("minPerformanceDate") Date minPerformanceDate,
            @Param("maxPerformanceDate") Date maxPerformanceDate
    );

    /*
    {
        "genre": [1, 2, 3, 4],
        "author": [1,2,3,4,5,6,7,8,9,10],
        "country": [1, 2, 3, 4, 5, 6],
        "century": [15, 21],
        "datePerformance": ["2000-01-01", "2050-05-05"]
    }
    */
}
