package nsu.theatre.repository;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.SqlResultSetMapping;
import nsu.theatre.dto.filter.AuthorFilterDTO;
import nsu.theatre.dto.response.ResponseAuthorPerformanceDTO;
import nsu.theatre.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    //4Получить список автоpов поставленных спектаклей, автоpов, живших в указанном веке, автоpов указанной стpаны,
    //автоpов спектаклей указанного жанpа когда-либо поставленных в этом театpе, поставленных за указанный пеpиод вpемени.
    @Query(nativeQuery = true, value = """
    SELECT
        a.name,
        a.title,
        c.name,
        g.name,
        a.birth_date,
        a.death_date,
        d.date_of_performance
    FROM authors a
        INNER JOIN performances p ON a.id = p.author_id
        INNER JOIN date_performance dp ON p.id = dp.performance_id
        INNER JOIN date_of_playing d ON dp.date_id = d.id
        INNER JOIN genres g ON a.genre_id = g.id
        INNER JOIN countries c ON a.country_id = c.id
    WHERE
        ((EXTRACT(CENTURY FROM a.birth_date) BETWEEN :minCentury AND :maxCentury)
        OR (EXTRACT(CENTURY FROM a.death_date) BETWEEN :minCentury AND :maxCentury))
        AND c.id IN :country
        AND g.id IN :genre
        AND d.date_of_performance BETWEEN :minPerformanceDate AND :maxPerformanceDate
    ORDER BY a.id
    """)
        List<Object[]> findByFilter(
             Long minCentury,
             Long maxCentury,
             List<Long> country,
             List<Long> genre,
             Date minPerformanceDate,
             Date maxPerformanceDate
    );

    /*
    {
  "century": [10,21],
  "date_performance": ["2000-01-01", "2050-12-31"],
  "country": [1, 2, 3, 4, 5, 6],
  "genre": [1,2,3,4]
}
     */
}