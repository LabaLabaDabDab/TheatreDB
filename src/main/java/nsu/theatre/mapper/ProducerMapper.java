package nsu.theatre.mapper;

import nsu.theatre.dto.ProducerDTO;
import nsu.theatre.entity.Producer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProducerMapper {
    private final EmployeeMapper employeeMapper;

    @Autowired
    public ProducerMapper(EmployeeMapper employeeMapper) {
        this.employeeMapper = employeeMapper;
    }

    public ProducerDTO toDTO(Producer producer) {
        ProducerDTO producerDTO = new ProducerDTO();
        producerDTO.setId(producer.getId());
        producerDTO.setEmployee(employeeMapper.toDTO(producer.getEmployee()));

        return producerDTO;
    }

    public Producer toEntity(ProducerDTO producerDTO) {

        Producer producer = new Producer();
        producer.setId(producerDTO.getId());
        producer.setEmployee(employeeMapper.toEntity(producerDTO.getEmployee()));

        return producer;
    }
}