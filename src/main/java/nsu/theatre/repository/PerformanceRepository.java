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

    //9. Получить список для указанного спектакля: актеpов, их дублеpов, имена pежисеpа-постановщика,
    //художника-постановщика, диpижеpа-постановщика, автоpов, дату пpемъеpы.
    @Query(nativeQuery = true, value = """
    SELECT
        employees.fio AS actor_name,
        producer_data.fio AS producer_name,
        musician_data.fio AS musician_name,
        director_data.fio AS director_name,
        authors.name AS author_name,
        performances.premiere_date AS premiere_date
    FROM actor_playing_role
    JOIN roles ON actor_playing_role.role_id = roles.id
    JOIN actors ON actor_playing_role.actor_id = actors.id
    JOIN employees ON actors.employee_id = employees.id
    JOIN performances ON roles.performance_id = performances.id
    JOIN (
        SELECT
            employees.fio,
            producer_performances.performances_id
        FROM producer
        JOIN employees ON producer.employee_id = employees.id
        JOIN producer_performances ON producer_performances.producer_id = producer.id
    ) producer_data ON performances.id = producer_data.performances_id
    JOIN (
        SELECT
            employees.fio,
            performances.id
        FROM musician
        JOIN employees ON musician.employee_id = employees.id
        JOIN performances ON performances.musician_id = musician.id
    ) musician_data ON performances.id = musician_data.id
    JOIN (
        SELECT
            employees.fio,
            performances.id
        FROM director
        JOIN employees ON director.employee_id = employees.id
        JOIN performances ON performances.director_performance_id = director.id
    ) director_data ON performances.id = director_data.id
    JOIN authors ON performances.author_id = authors.id
    WHERE performances.id IN :performanceIds
""")
    List<Object[]> findPerformanceDetails(
            @Param("performanceIds") List<Long> performance
    );
    /*
    {
        "performance": [1]
    }
     */
}
