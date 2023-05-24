package nsu.theatre.repository;

import nsu.theatre.entity.Employee;
import nsu.theatre.entity.EmployeeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EmployeeTypeRepository extends JpaRepository<EmployeeType, Long> {


}