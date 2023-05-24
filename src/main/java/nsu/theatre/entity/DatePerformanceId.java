package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class DatePerformanceId implements Serializable {

    @Column(name = "date_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Long dateId;

    @Column(name = "performance_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Long performanceId;
}
