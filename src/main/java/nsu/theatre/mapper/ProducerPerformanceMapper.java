package nsu.theatre.mapper;

import nsu.theatre.dto.ProducerPerformanceDTO;
import nsu.theatre.entity.ProducerPerformance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProducerPerformanceMapper {
    private final ProducerMapper producerMapper;
    private final PerformanceMapper performanceMapper;

    @Autowired
    public ProducerPerformanceMapper(ProducerMapper producerMapper, PerformanceMapper performanceMapper) {
        this.producerMapper = producerMapper;
        this.performanceMapper = performanceMapper;
    }

    public ProducerPerformanceDTO toDTO(ProducerPerformance producerPerformance) {
        ProducerPerformanceDTO producerPerformanceDTO = new ProducerPerformanceDTO();
        producerPerformanceDTO.setId(producerPerformance.getId());
        producerPerformanceDTO.setProducer(producerMapper.toDTO(producerPerformance.getProducer()));
        producerPerformanceDTO.setPerformance(performanceMapper.toDTO(producerPerformance.getPerformance()));
        return producerPerformanceDTO;
    }

    public ProducerPerformance toEntity(ProducerPerformanceDTO producerPerformanceDTO) {
        ProducerPerformance producerPerformance = new ProducerPerformance();
        producerPerformance.setId(producerPerformanceDTO.getId());
        producerPerformance.setProducer(producerMapper.toEntity(producerPerformanceDTO.getProducer()));
        producerPerformance.setPerformance(performanceMapper.toEntity(producerPerformanceDTO.getPerformance()));
        return producerPerformance;
    }
}