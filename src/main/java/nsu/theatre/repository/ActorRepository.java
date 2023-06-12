package nsu.theatre.repository;

import nsu.theatre.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Long> {
    //6. Получить список актёpов, подходящих по своим данным на указанную pоль.
    @Query(nativeQuery = true, value = """
        SELECT employees.fio, roles.name
        FROM actors
        INNER JOIN employees ON actors.employee_id = employees.id
        INNER JOIN actor_playing_role ON actors.id = actor_playing_role.actor_id
        INNER JOIN roles ON actor_playing_role.role_id = roles.id
        WHERE
            EXTRACT(YEAR FROM AGE(employees.birth_date)) BETWEEN roles.age - 5 AND roles.age + 5
            AND employees.gender_id = roles.gender_id
            AND actors.height BETWEEN roles.height - 10 AND roles.height + 10
        """)
    List<Object[]> getAllActorRoles();

    //7.Получить общее число и список актеpов театpа, имеющих звания, получивших их за некоторый пеpиод, на указанных конкуpсах,
    //по половому пpизнаку, по возpасту.
    @Query(nativeQuery = true, value = """
    SELECT
        employees.fio AS fio,
        gender.type AS gender,
        achievement.competition AS competition,
        achievement.date_of_competition AS date_of_competition,
        achievement.rank AS rank,
        employees.birth_date AS birth_date
    FROM actors
        JOIN employees ON actors.employee_id = employees.id
        JOIN achievement ON actors.id = achievement.actor_id
        JOIN gender ON employees.gender_id = gender.id
    WHERE
        achievement.date_of_competition BETWEEN :startDate AND :endDate
        AND achievement.competition IN :competitionList
        AND achievement.rank IN :rankList
        AND gender.id IN :genderList
        AND employees.birth_date BETWEEN :birthDateStart AND :birthDateEnd
    """)
    List<Object[]> findByFilter(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("competitionList") List<String> competitionList,
            @Param("rankList") List<String> rankList,
            @Param("genderList") List<Long> genderList,
            @Param("birthDateStart") Date birthDateStart,
            @Param("birthDateEnd") Date birthDateEnd
    );

    @Query(nativeQuery = true, value = """
    SELECT
        COUNT(*) OVER() AS total_count
    FROM actors
        JOIN employees ON actors.employee_id = employees.id
        JOIN achievement ON actors.id = achievement.actor_id
        JOIN gender ON employees.gender_id = gender.id
    WHERE
        achievement.date_of_competition BETWEEN :startDate AND :endDate
        AND achievement.competition IN :competitionList
        AND achievement.rank IN :rankList
        AND gender.id IN :genderList
        AND employees.birth_date BETWEEN :birthDateStart AND :birthDateEnd
    """)
    Long countFindByFilter(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("competitionList") List<String> competitionList,
            @Param("rankList") List<String> rankList,
            @Param("genderList") List<Long> genderList,
            @Param("birthDateStart") Date birthDateStart,
            @Param("birthDateEnd") Date birthDateEnd
    );
    /*
    {
        "dateCompetition": ["1940-05-05", "2050-05-05"],
        "competition": ["Лучшие из худших"],
        "rank": ["Просто бомба"],
        "gender": [1, 2],
        "birthDate": ["1940-05-05", "2050-05-05"]
    }
     */

    //10. Получить перечень и общее число pолей, сыгpанных указанным актеpом всего, за некоторый пеpиод вpемени,
    //в спектаклях определенного жанpа, в спектаклях указанного pежисеpа-постановщика, в детских спектаклях.
    @Query(nativeQuery = true, value = """
    SELECT
        actor_roles.actor_name,
        actor_roles.role_name,
        authors.title,
        genres.name as genre,
        performances.age_limit,
        date_of_playing.date_of_performance,
        employees_producer.fio AS producer_name
    FROM
        (
            SELECT
                employees.fio AS actor_name,
                roles.id AS role_id,
                roles.name AS role_name,
                roles.performance_id AS performance_id,
                actor_playing_role.date_of_playing AS date_of_playing
            FROM
                actor_playing_role
            JOIN
                roles ON actor_playing_role.role_id = roles.id
            JOIN
                actors ON actor_playing_role.actor_id = actors.id
            JOIN
                employees ON actors.employee_id = employees.id
            WHERE
                actors.id IN :actorIds
        ) actor_roles
    JOIN
        performances ON actor_roles.performance_id = performances.id
    JOIN
        authors ON performances.author_id = authors.id
    JOIN
        genres ON authors.genre_id = genres.id
    JOIN
        producer_performances ON performances.id = producer_performances.performances_id
    JOIN
        producer ON producer_performances.producer_id = producer.id
    JOIN
        employees AS employees_producer ON producer.employee_id = employees_producer.id
    JOIN
        date_performance ON performances.id = date_performance.performance_id
    JOIN
        date_of_playing ON date_performance.date_id = date_of_playing.id
    WHERE
        date_of_playing.date_of_performance BETWEEN :startDate AND :endDate AND
        genres.id IN :genreIds AND
        producer.id IN :producerIds AND
        performances.age_limit <= :ageLimit
    ORDER BY
        actor_roles.actor_name
    """)
    List<Object[]> findActorPlayedRoleFilter(
            @Param("actorIds") List<Long> actor,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("genreIds") List<Long> genre,
            @Param("producerIds") List<Long> producer,
            @Param("ageLimit") Integer ageLimit
    );

    @Query(nativeQuery = true, value = """
    SELECT
        COUNT(DISTINCT actor_roles.role_id) AS role_count
    FROM
        (
            SELECT
                employees.fio AS actor_name,
                roles.id AS role_id,
                roles.name AS role_name,
                roles.performance_id AS performance_id,
                actor_playing_role.date_of_playing AS date_of_playing
            FROM
                actor_playing_role
            JOIN
                roles ON actor_playing_role.role_id = roles.id
            JOIN
                actors ON actor_playing_role.actor_id = actors.id
            JOIN
                employees ON actors.employee_id = employees.id
            WHERE
                actors.id IN :actorIds
        ) actor_roles
    JOIN
        performances ON actor_roles.performance_id = performances.id
    JOIN
        authors ON performances.author_id = authors.id
    JOIN
        genres ON authors.genre_id = genres.id
    JOIN
        producer_performances ON performances.id = producer_performances.performances_id
    JOIN
        producer ON producer_performances.producer_id = producer.id
    JOIN
        date_performance ON performances.id = date_performance.performance_id
    JOIN
        date_of_playing ON date_performance.date_id = date_of_playing.id
    WHERE
        date_of_playing.date_of_performance BETWEEN :startDate AND :endDate AND
        genres.id IN :genreIds AND
        producer.id IN :producerIds AND
        performances.age_limit <= :ageLimit
    GROUP BY
        actor_roles.actor_name
    ORDER BY
        actor_roles.actor_name
    """)
    Long getActorPlayedRoleCount(
            @Param("actorIds") List<Long> actor,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("genreIds") List<Long> genre,
            @Param("producerIds") List<Long> producer,
            @Param("ageLimit") Integer ageLimit
    );
    /*
    {
        "actor": [10],
        "dateOfPlaying": ["2000-01-01", "2023-12-31"],
        "genre": [1, 2, 3, 4],
        "producer": [1, 2, 3, 4]
    }
     */
}
