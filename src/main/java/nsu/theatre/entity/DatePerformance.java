package nsu.theatre.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "date_performance")
public class DatePerformance {
    @EmbeddedId
    private DatePerformanceId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "date_id", referencedColumnName = "id", nullable = false,
            foreignKey = @ForeignKey(name = "date_performance_date_id_fkey"), insertable = false, updatable = false)
    private DateOfPlaying date;

    @ManyToOne
    @MapsId("performanceId")
    @JoinColumn(name = "performance_id")
    private Performance performance;
}

