package nsu.theatre.repository;

import nsu.theatre.entity.DatePerformance;
import nsu.theatre.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    //1. Получить список и общее число все pаботников театpа, актеpов, музыкантов, по стажу pаботы в театpе,
    //по половому пpизнаку, году pождения, возpасту, пpизнаку наличия и количества детей, pазмеpу заpаботной платы.
    @Query(nativeQuery = true, value = """
                                        SELECT *
                                        FROM employees
                                        WHERE type_id in ?1 and hire_date between ?2 and ?3 
                                                and gender_id in ?4 and birth_date between ?5 and ?6
                                                and children_amount between ?7 and ?8
                                                and salary between ?9 and ?10
                                        """
    )
    public List<Employee> findByFilter(List<Long> types,
                                       Date year_start,
                                       Date year_end,
                                       List<Long> gender_id,
                                       Date birth_date_start,
                                       Date birth_date_end,
                                       Long amount_children_start,
                                       Long amount_children_end,
                                       Long salary_start,
                                       Long salary_end
    );
    @Query(nativeQuery = true, value = """
                                        SELECT 
                                        COUNT(*) OVER () AS total_count
                                        FROM employees
                                        WHERE type_id in ?1 and hire_date between ?2 and ?3 
                                                and gender_id in ?4 and birth_date between ?5 and ?6
                                                and children_amount between ?7 and ?8
                                                and salary between ?9 and ?10
                                        """
    )
    public Long countByFilter(List<Long> types,
                                       Date year_start,
                                       Date year_end,
                                       List<Long> gender_id,
                                       Date birth_date_start,
                                       Date birth_date_end,
                                       Long amount_children_start,
                                       Long amount_children_end,
                                       Long salary_start,
                                       Long salary_end
    );
    /*
    {
        "types": [1,2,3, 4],
        "years": [0, 100],
        "genders" :[1,2],
        "birth_dates": ["1940-05-05", "2005-01-02"],
        "amount_children": [0,5],
        "salary": [0, 100000]
    }
     */
}
