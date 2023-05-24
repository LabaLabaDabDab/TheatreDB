package nsu.theatre.mapper;

import nsu.theatre.dto.EmployeeTypeDTO;
import nsu.theatre.entity.EmployeeType;
import org.springframework.stereotype.Component;

@Component
public class EmployeeTypeMapper {
    public EmployeeTypeDTO toDTO(EmployeeType employeeType) {
        EmployeeTypeDTO employeeTypeDTO = new EmployeeTypeDTO();
        employeeTypeDTO.setId(employeeType.getId());
        employeeTypeDTO.setType(employeeType.getType());
        return employeeTypeDTO;
    }

    public EmployeeType toEntity(EmployeeTypeDTO employeeTypeDTO) {
        EmployeeType employeeType = new EmployeeType();
        employeeType.setId(employeeTypeDTO.getId());
        employeeType.setType(employeeTypeDTO.getType());
        return employeeType;
    }
}
