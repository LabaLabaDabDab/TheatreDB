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
    SELECT a.title, p.premiere_date, COUNT(tn.ticket_id) AS sold_tickets_count
    FROM performances p
        JOIN date_performance dp ON p.id = dp.performance_id
        JOIN date_of_playing d ON dp.date_id = d.id
        JOIN authors a on a.id = p.author_id
        LEFT JOIN tickets t ON t.performance_id = p.id AND t.date_id = d.id
        LEFT JOIN ticket_number tn ON t.id = tn.ticket_id
    WHERE d.date_of_performance = p.premiere_date
        AND tn.is_sold = true
    GROUP BY a.title, p.premiere_date;
                    
""")
    List<Object[]> getSoldTicketsCountByPremiere();

    @Query(nativeQuery = true, value = """
    SELECT a.title, d.date_of_performance, COUNT(*) AS sold_tickets_count
    FROM tickets t
        JOIN ticket_number tn ON t.id = tn.ticket_id
        JOIN performances p ON p.id = t.performance_id
        JOIN authors a ON a.id = p.author_id
        JOIN date_of_playing d ON t.date_id = d.id
    WHERE
        t.performance_id IN :performance
        AND (d.date_of_performance BETWEEN :startDate AND :endDate)
        AND tn.is_sold = true
    GROUP BY a.title, d.date_of_performance
""")
    List<Object[]> getSoldTicketsCountByPerformanceTitleAndDate(
            @Param("performance") List<Long> performance,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );
    /*
    {
        "performance": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "date_performance": ["2000-01-01", "2025-12-31"]
    }
     */


    //12. Получить общую сумму выpученных денег за указанный спектакль, за некоторый пеpиод вpемени.
    @Query(nativeQuery = true, value = """
    SELECT a.title, d.date_of_performance, SUM(CAST(tn.is_sold AS INT) * t.price) AS total_revenue
    FROM tickets t
        JOIN performances p ON p.id = t.performance_id
        JOIN date_of_playing d ON d.id = t.date_id
        JOIN authors a on a.id = p.author_id
        JOIN ticket_number tn ON tn.ticket_id = t.id
    WHERE p.id IN :performance
        AND d.date_of_performance BETWEEN :startDate AND :endDate
    GROUP BY a.title, d.date_of_performance;
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

    //Запрос для получения списка свободных мест для каждого спектакля:
    @Query(nativeQuery = true, value = """
    SELECT a.title, dop.date_of_performance, tn.number_ticket_id
    FROM performances p
    JOIN tickets t ON p.id = t.performance_id
    JOIN ticket_number tn ON t.id = tn.ticket_id
    JOIN authors a on a.id = p.author_id
    JOIN date_of_playing dop on dop.id = t.date_id
    WHERE tn.is_sold = false AND p.id IN :performance
    GROUP BY a.title, dop.date_of_performance, tn.number_ticket_id
    """)
    List<Object[]> getFreeSeatsByPerformance(@Param("performance") List<Long> performance);

    //Запрос для получения общего количества свободных мест для каждого спектакля:
    @Query(nativeQuery = true, value = """
    SELECT a.title, dop.date_of_performance, COUNT(tn.number_ticket_id) AS total_free_seats
    FROM performances p
    JOIN tickets t ON p.id = t.performance_id
    JOIN ticket_number tn ON t.id = tn.ticket_id
    JOIN authors a on a.id = p.author_id
    JOIN date_of_playing dop on dop.id = t.date_id
    WHERE tn.is_sold = false AND p.id IN :performance
    GROUP BY a.title, dop.date_of_performance
    """)
    List<Object[]> getTotalFreeSeatsByPerformance(@Param("performance") List<Long> performance);

    /*
    {
        "performance": [1]
    }
     */

    //Запрос для получения списка свободных мест на премьеру каждого спектакля:
    @Query(nativeQuery = true, value = """
    SELECT a.title, tn.number_ticket_id
    FROM performances p
    JOIN tickets t ON p.id = t.performance_id
    JOIN date_of_playing d ON d.id = t.date_id
    JOIN ticket_number tn ON t.id = tn.ticket_id
    JOIN authors a on a.id = p.author_id
    WHERE tn.is_sold = false AND d.date_of_performance = p.premiere_date
    GROUP BY a.title, tn.number_ticket_id
    """)
    List<Object[]> getFreeSeatsOnPremiere();


    //Запрос для получения общего количества свободных мест на премьеру каждого спектакля:
    @Query(nativeQuery = true, value = """
    SELECT a.title, COUNT(tn.number_ticket_id) AS total_free_seats
    FROM performances p
    JOIN tickets t ON p.id = t.performance_id
    JOIN date_of_playing d ON d.id = t.date_id
    JOIN ticket_number tn ON t.id = tn.ticket_id
    JOIN authors a on a.id = p.author_id
    WHERE tn.is_sold = false AND d.date_of_performance = p.premiere_date
    GROUP BY a.title
    """)
    List<Object[]> getTotalFreeSeatsOnPremiere();
}
