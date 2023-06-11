package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "producer_performances")
public class ProducerPerformance {
    @EmbeddedId
    private ProducerPerformanceId id;

    @ManyToOne
    @JoinColumn(name = "producer_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "producer_performances_producer_id_fk"), insertable = false, updatable = false)
    private Producer producer;

    @ManyToOne
    @JoinColumn(name = "performances_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "producer_performances_performances_id_fk"), insertable = false, updatable = false)
    private Performance performance;
}
