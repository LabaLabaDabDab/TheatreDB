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
    /*
    {
        "dateCompetition": ["1940-05-05", "2050-05-05"],
        "competition": ["Лучшие из худших"],
        "rank": ["Просто бомба"],
        "gender": [1, 2],
        "birthDate": ["1940-05-05", "2050-05-05"]
    }
     */
}
