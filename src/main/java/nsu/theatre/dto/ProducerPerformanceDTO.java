package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.ProducerPerformanceId;

@Data
public class ProducerPerformanceDTO {
    private ProducerPerformanceId id;
    private ProducerDTO producer;
    private PerformanceDTO performance;
}
