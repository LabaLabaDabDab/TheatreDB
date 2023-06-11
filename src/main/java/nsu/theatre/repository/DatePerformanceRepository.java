package nsu.theatre.repository;

import nsu.theatre.entity.DatePerformance;
import nsu.theatre.entity.DatePerformanceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DatePerformanceRepository extends JpaRepository<DatePerformance, DatePerformanceId> {
    //запросы 2 и 3
    //2.Получить перечень и общее число спектаклей, указанных в pепеpтуаpе на данный сезон, уже сыгpанных спектаклей,
    //спектаклей указанного жанpа, когда-либо сыгpанных в этом театpе, за указанный пеpиод.

    //3.Получить перечень и общее число всех поставленных спектаклей, спектаклей указанного жанpа, когда-либо поставленных в этом театpе,
    //поставленных за указанный пеpиод
    @Query(nativeQuery = true, value = """
    SELECT
        dop.season,
        dop.date_of_performance,
        a.name,
        a.title,
        g.name
    FROM
        date_performance dp
        JOIN date_of_playing dop ON dp.date_id = dop.id
        JOIN performances p ON dp.performance_id = p.id
        JOIN authors a ON p.author_id = a.id
        JOIN genres g on g.id = a.genre_id
    WHERE
        dop.date_of_performance BETWEEN :datePerformancesStart AND :datePerformancesEnd
        AND dop.season IN (:seasons)
        AND a.genre_id IN (:genres)
""")
    List<Object[]> findBySeasonFilter(
            @Param("seasons") List<Long> seasons,
            @Param("datePerformancesStart") Date datePerformancesStart,
            @Param("datePerformancesEnd") Date datePerformancesEnd,
            @Param("genres") List<Long> genres
    );

    @Query(nativeQuery = true, value = """
    SELECT COUNT(*)
    FROM
        date_performance dp
        JOIN date_of_playing dop ON dp.date_id = dop.id
        JOIN performances p ON dp.performance_id = p.id
        JOIN authors a ON p.author_id = a.id
        JOIN genres g on g.id = a.genre_id
    WHERE
        dop.date_of_performance BETWEEN :datePerformancesStart AND :datePerformancesEnd
        AND dop.season IN (:seasons)
        AND a.genre_id IN (:genres)
""")
    Long countBySeasonFilter(
            @Param("seasons") List<Long> seasons,
            @Param("datePerformancesStart") Date datePerformancesStart,
            @Param("datePerformancesEnd") Date datePerformancesEnd,
            @Param("genres") List<Long> genres
    );

}