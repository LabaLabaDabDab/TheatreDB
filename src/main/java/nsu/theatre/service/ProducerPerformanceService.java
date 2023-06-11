package nsu.theatre.service;

import nsu.theatre.dto.ProducerPerformanceDTO;
import nsu.theatre.entity.Performance;
import nsu.theatre.entity.Producer;
import nsu.theatre.entity.ProducerPerformance;
import nsu.theatre.entity.ProducerPerformanceId;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.PerformanceMapper;
import nsu.theatre.mapper.ProducerMapper;
import nsu.theatre.mapper.ProducerPerformanceMapper;
import nsu.theatre.repository.PerformanceRepository;
import nsu.theatre.repository.ProducerPerformanceRepository;
import nsu.theatre.repository.ProducerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProducerPerformanceService {
    private final ProducerPerformanceRepository producerPerformanceRepository;
    private final ProducerPerformanceMapper producerPerformanceMapper;
    private final PerformanceMapper performanceMapper;
    private final ProducerMapper producerMapper;
    private final PerformanceRepository performanceRepository;
    private final ProducerRepository producerRepository;

    @Autowired
    public ProducerPerformanceService(ProducerPerformanceRepository producerPerformanceRepository, ProducerPerformanceMapper producerPerformanceMapper,
                                      PerformanceMapper performanceMapper, ProducerMapper producerMapper, PerformanceRepository performanceRepository, ProducerRepository producerRepository) {
        this.producerPerformanceRepository = producerPerformanceRepository;
        this.producerPerformanceMapper = producerPerformanceMapper;
        this.performanceMapper = performanceMapper;
        this.producerMapper = producerMapper;
        this.performanceRepository = performanceRepository;
        this.producerRepository = producerRepository;
    }

    public Page<ProducerPerformanceDTO> getAllProducerPerformances(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<ProducerPerformance> pagedResult = producerPerformanceRepository.findAll(pageable);
        return pagedResult.map(producerPerformanceMapper::toDTO);
    }

    public List<ProducerPerformanceDTO> getAllProducerPerformancesList() {
        List<ProducerPerformance> producerPerformanceList = producerPerformanceRepository.findAll();
        return producerPerformanceList.stream()
                .map(producerPerformanceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProducerPerformanceDTO getProducerPerformanceById(Long producerId, Long performanceId) {
        ProducerPerformanceId id = new ProducerPerformanceId(producerId, performanceId);
        ProducerPerformance producerPerformance = producerPerformanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ProducerPerformance not found with id: " + id));
        return producerPerformanceMapper.toDTO(producerPerformance);
    }

    public ProducerPerformanceDTO createProducerPerformance(ProducerPerformanceDTO producerPerformanceDTO) {
        Performance performance = performanceRepository.findById(producerPerformanceDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + producerPerformanceDTO.getPerformance().getId()));
        Producer producer = producerRepository.findById(producerPerformanceDTO.getProducer().getId())
                .orElseThrow(() -> new NotFoundException("Producer not found with id: " + producerPerformanceDTO.getProducer().getId()));

        producerPerformanceDTO.setPerformance(performanceMapper.toDTO(performance));
        producerPerformanceDTO.setProducer(producerMapper.toDTO(producer));

        ProducerPerformance producerPerformance = producerPerformanceMapper.toEntity(producerPerformanceDTO);
        producerPerformance.setPerformance(performance);
        producerPerformance.setProducer(producer);
        ProducerPerformance createdProducerPerformance = producerPerformanceRepository.save(producerPerformance);

        return producerPerformanceMapper.toDTO(createdProducerPerformance);
    }

    public ProducerPerformanceDTO updateProducerPerformance(Long producerId, Long performanceId, ProducerPerformanceDTO producerPerformanceDTO) {
        ProducerPerformanceId id = new ProducerPerformanceId(producerId, performanceId);
        ProducerPerformance existingProducerPerformance = producerPerformanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ProducerPerformance not found with id: " + id));

        producerPerformanceRepository.deleteById(id);

        ProducerPerformanceId newId = new ProducerPerformanceId(producerPerformanceDTO.getProducer().getId(), producerPerformanceDTO.getPerformance().getId());

        Performance performance = performanceRepository.findById(producerPerformanceDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + producerPerformanceDTO.getPerformance().getId()));
        Producer producer = producerRepository.findById(producerPerformanceDTO.getProducer().getId())
                .orElseThrow(() -> new NotFoundException("Producer not found with id: " + producerPerformanceDTO.getProducer().getId()));

        ProducerPerformance newProducerPerformance = new ProducerPerformance();
        newProducerPerformance.setId(newId);
        newProducerPerformance.setPerformance(performance);
        newProducerPerformance.setProducer(producer);

        ProducerPerformance updatedProducerPerformance = producerPerformanceRepository.save(newProducerPerformance);
        return producerPerformanceMapper.toDTO(updatedProducerPerformance);
    }

    public void deleteProducerPerformance(Long producerId, Long performanceId) {
        ProducerPerformanceId id = new ProducerPerformanceId(producerId, performanceId);
        ProducerPerformance existingProducerPerformance = producerPerformanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ProducerPerformance not found with id: " + id));
        producerPerformanceRepository.delete(existingProducerPerformance);
    }
}
