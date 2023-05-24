package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pet_seq")
    @GenericGenerator(name = "pet_seq", strategy = "increment")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_main")
    private Boolean main;

    @Column(name = "age")
    private Long age;

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @Column(name = "height")
    private Long height;

    @ManyToOne
    private Performance performance;
}
