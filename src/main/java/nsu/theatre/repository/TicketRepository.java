package nsu.theatre.repository;

import nsu.theatre.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    //11. Получить сведения о числе пpоданных билетов на все спектакли, на конкpетный спектакль, на пpемьеpы,
    //за указанный пеpиод, в том числе пpоданных пpедваpительно.
    @Query(nativeQuery = true, value = """
    SELECT a.title, dop.date_of_performance, COUNT(*) AS sold_tickets_count
    FROM tickets t
        JOIN date_performance dp ON t.date_id = dp.date_id AND t.performance_id = dp.performance_id
        JOIN performances p ON dp.performance_id = p.id
        JOIN authors a ON a.id = p.author_id
        JOIN date_of_playing dop ON dp.date_id = dop.id
        JOIN ticket_number tn ON t.id = tn.ticket_id
    WHERE
        dp.performance_id IN :performance
        AND (dop.date_of_performance BETWEEN :startDate AND :endDate)
        AND tn.is_sold = true
        AND (:premiere IS FALSE OR p.premiere_date = dop.date_of_performance)
    GROUP BY a.title, dop.date_of_performance
    """)
    List<Object[]> getSoldTicketsCountByPerformanceTitleAndDate(
            @Param("performance") List<Long> performance,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("premiere") Boolean premiere
    );

    /*
    {
        "performance": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "date_performance": ["2000-01-01", "2025-12-31"]
    }
     */

    //12. Получить общую сумму выpученных денег за указанный спектакль, за некоторый пеpиод вpемени.


    @Query(nativeQuery = true, value = """
    SELECT a.title, dop.date_of_performance, SUM(CAST(tn.is_sold AS INT) * t.price) AS total_revenue
    FROM tickets t
        JOIN ticket_number tn ON tn.ticket_id = t.id
        JOIN date_performance dp ON t.date_id = dp.date_id AND t.performance_id = dp.performance_id
        JOIN date_of_playing dop ON dp.date_id = dop.id
        JOIN performances p ON dp.performance_id = p.id
        JOIN authors a on p.author_id = a.id
    WHERE p.id IN :performance
        AND dop.date_of_performance BETWEEN :startDate AND :endDate
    GROUP BY a.title, dop.date_of_performance;
""")
    List<Object[]> getTotalRevenueByPerformanceAndDate(
            @Param("performance") List<Long> performance,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );

    /*
    {
        "performance": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "date_performance": ["2000-01-01", "2023-12-31"]
    }
     */

    //13. Получить перечень и общее число свободных мест на все спектакли, на конкpетный спектакль, на пpемьеpы.
    @Query(nativeQuery = true, value = """
    SELECT a.title, dop.date_of_performance, tn.number_ticket_id
      FROM tickets t
          JOIN ticket_number tn ON tn.ticket_id = t.id
          JOIN date_performance dp ON t.date_id = dp.date_id AND t.performance_id = dp.performance_id
          JOIN date_of_playing dop ON dp.date_id = dop.id
          JOIN performances p ON dp.performance_id = p.id
          JOIN authors a ON a.id = p.author_id
    WHERE tn.is_sold = false
          AND (:premiere IS FALSE OR dop.date_of_performance = p.premiere_date)
          AND p.id IN :performance
      GROUP BY a.title, dop.date_of_performance, tn.number_ticket_id
    """)
    List<Object[]> getFreeSeatsByPerformance(
            @Param("performance") List<Long> performance,
            @Param("premiere") Boolean premiere
    );

    @Query(nativeQuery = true, value = """
    SELECT COUNT(tn.number_ticket_id) AS total_free_seats
        FROM tickets t
        JOIN ticket_number tn ON tn.ticket_id = t.id
        JOIN date_performance dp ON t.date_id = dp.date_id AND t.performance_id = dp.performance_id
        JOIN date_of_playing dop ON dp.date_id = dop.id
        JOIN performances p ON dp.performance_id = p.id
        JOIN authors a ON a.id = p.author_id
    WHERE tn.is_sold = false
        AND (:premiere IS FALSE OR dop.date_of_performance = p.premiere_date)
        AND p.id IN :performance
    """)
    public Long getTotalFreeSeatsByPerformance(
            @Param("performance") List<Long> performance,
            @Param("premiere") Boolean premiere
    );

    /*
    {
        "performance": [1]
    }
     */

}
