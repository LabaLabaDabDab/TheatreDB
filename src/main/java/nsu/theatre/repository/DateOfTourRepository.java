package nsu.theatre.repository;

import nsu.theatre.entity.DateOfTour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DateOfTourRepository extends JpaRepository<DateOfTour, Long> {
    @Query(nativeQuery = true, value = """
        SELECT
            employees.fio AS person_name,
            employee_type.type AS role,
            date_of_tour.date_start AS tour_start,
            date_of_tour.date_end AS tour_end
        FROM actor_tour
        JOIN actors ON actor_tour.actor_id = actors.id
        JOIN employees ON actors.employee_id = employees.id
        JOIN employee_type ON employees.type_id = employee_type.id
        JOIN date_of_tour ON actor_tour.date_of_tour_id = date_of_tour.id
        JOIN performances ON date_of_tour.performance_id = performances.id
        WHERE
            date_of_tour.date_start >= :startDate AND date_of_tour.date_end <= :endDate
        UNION ALL
        SELECT
            employees.fio AS person_name,
            employee_type.type AS role,
            date_of_tour.date_start AS tour_start,
            date_of_tour.date_end AS tour_end
        FROM performances
        JOIN director ON performances.director_performance_id = director.id
        JOIN employees ON director.employee_id = employees.id
        JOIN employee_type ON employees.type_id = employee_type.id
        JOIN date_of_tour ON performances.id = date_of_tour.performance_id
        WHERE
            date_of_tour.date_start >= :startDate AND date_of_tour.date_end <= :endDate
        UNION ALL
        SELECT
            employees.fio AS person_name,
            employee_type.type AS role,
            date_of_tour.date_start AS tour_start,
            date_of_tour.date_end AS tour_end
        FROM performances
        JOIN musician ON performances.musician_id = musician.id
        JOIN employees ON musician.employee_id = employees.id
        JOIN employee_type ON employees.type_id = employee_type.id
        JOIN date_of_tour ON performances.id = date_of_tour.performance_id
        WHERE
            date_of_tour.date_start >= :startDate AND date_of_tour.date_end <= :endDate
        UNION ALL
        SELECT
            employees.fio AS person_name,
            employee_type.type AS role,
            date_of_tour.date_start AS tour_start,
            date_of_tour.date_end AS tour_end
        FROM performances
        JOIN producer ON performances.producer_id = producer.id
        JOIN employees ON producer.employee_id = employees.id
        JOIN employee_type ON employees.type_id = employee_type.id
        JOIN date_of_tour ON performances.id = date_of_tour.performance_id
        WHERE
            date_of_tour.date_start >= :startDate AND date_of_tour.date_end <= :endDate
        """)
    List<Object[]> findByDateOfTourBetween(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );
    /*
    {
        "dateOfTour": ["2000-01-01", "2023-12-31"]
    }
     */
}
