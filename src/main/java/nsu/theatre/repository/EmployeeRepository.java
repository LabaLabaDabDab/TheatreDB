package nsu.theatre.repository;

import nsu.theatre.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query(nativeQuery = true, value = """
                                        SELECT * ,
                                        COUNT(*) OVER () AS total_count
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
}
