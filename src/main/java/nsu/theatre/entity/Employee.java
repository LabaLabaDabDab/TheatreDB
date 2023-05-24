package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
public class Employee{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pet_seq")
    @GenericGenerator(name = "pet_seq", strategy = "increment")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private EmployeeType type;

    @Column
    private String fio;

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @Column
    private Date birth_date;

    @Column
    private Long children_amount;

    @Column
    private Long salary;

    @Column
    private Date hire_date;
}