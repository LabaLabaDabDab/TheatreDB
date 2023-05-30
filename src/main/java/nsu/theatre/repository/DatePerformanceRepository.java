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
    @Query("""
       SELECT 
            dp
       FROM DatePerformance dp
       WHERE
            (cast(:datePerformancesStart as date) is null or dp.date.date_of_performance >= (cast(:datePerformancesStart as date)))
            AND (cast(:datePerformancesEnd as date) is null or dp.date.date_of_performance <= (cast(:datePerformancesEnd as date)))
            AND (:seasons IS NULL OR dp.date.season IN :seasons) 
            AND (:genres IS NULL OR dp.performance.author.genre.id IN :genres)
       """)
    List<DatePerformance> findBySeasonFilter(
            @Param("seasons") Long seasons,
            @Param("datePerformancesStart") Date datePerformancesStart,
            @Param("datePerformancesEnd") Date datePerformancesEnd,
            @Param("genres") Long genres
    );
    @Query("""
    SELECT 
         count(dp)
    FROM DatePerformance dp
    WHERE
         (cast(:datePerformancesStart as date) is null or dp.date.date_of_performance >= (cast(:datePerformancesStart as date)))
         AND (cast(:datePerformancesEnd as date) is null or dp.date.date_of_performance <= (cast(:datePerformancesEnd as date)))
         AND (:seasons IS NULL OR dp.date.season IN :seasons) 
         AND (:genres IS NULL OR dp.performance.author.genre.id IN :genres)
    """)
    Long countBySeasonFilter(
            @Param("seasons") Long seasons,
            @Param("datePerformancesStart") Date datePerformancesStart,
            @Param("datePerformancesEnd") Date datePerformancesEnd,
            @Param("genres") Long genres
    );
}