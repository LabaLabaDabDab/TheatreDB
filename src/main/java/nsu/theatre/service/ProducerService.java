package nsu.theatre.service;

import nsu.theatre.dto.ProducerDTO;
import nsu.theatre.entity.Employee;
import nsu.theatre.entity.Producer;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.ProducerMapper;
import nsu.theatre.repository.EmployeeRepository;
import nsu.theatre.repository.ProducerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProducerService {
    private final ProducerRepository producerRepository;
    private final EmployeeRepository employeeRepository;
    private final ProducerMapper producerMapper;

    @Autowired
    public ProducerService(ProducerRepository producerRepository, EmployeeRepository employeeRepository, ProducerMapper producerMapper) {
        this.producerRepository = producerRepository;
        this.employeeRepository = employeeRepository;
        this.producerMapper = producerMapper;
    }

    public List<ProducerDTO> getAllProducers() {
        List<Producer> producers = producerRepository.findAll();
        return producers.stream()
                .map(producerMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProducerDTO getProducer(Long id) {
        Producer producer = producerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Producer not found"));
        return producerMapper.toDTO(producer);
    }

    public ProducerDTO createProducer(ProducerDTO producerDTO) {
        Employee employee = employeeRepository.findById(producerDTO.getEmployee().getId()).
                orElseThrow(() -> new RuntimeException("Employee not found"));
        System.out.println(employee);
        Producer producer = producerMapper.toEntity(producerDTO);
        Producer savedProducer = producerRepository.save(producer);
        return producerMapper.toDTO(savedProducer);
    }

    public void deleteProducer(Long id) {
        Producer producer = producerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Producer not found with id: " + id));
        producerRepository.delete(producer);
    }

    public ProducerDTO updateProducer(Long id, ProducerDTO producerDTO) {
        Producer producer = producerRepository.findById(id).orElseThrow(() -> new NotFoundException("Producer not found with id: " + id));
        Employee employee = employeeRepository.findById(producerDTO.getEmployee().getId()).orElseThrow(() -> new RuntimeException("Employee not found"));
        producer.setEmployee(employee);

        Producer updatedProducer = producerRepository.save(producer);
        return producerMapper.toDTO(updatedProducer);
    }
}