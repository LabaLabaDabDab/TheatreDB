package nsu.theatre.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ProducerPerformanceId implements Serializable {
    @Column(name = "producer_id")
    private Long producerId;

    @Column(name = "performances_id")
    private Long performancesId;
}
