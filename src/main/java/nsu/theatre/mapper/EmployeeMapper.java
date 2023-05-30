package nsu.theatre.mapper;

import nsu.theatre.dto.EmployeeDTO;
import nsu.theatre.dto.response.ResponseEmployeeDTO;
import nsu.theatre.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {
    private final EmployeeTypeMapper employeeTypeMapper;
    private final GenderMapper genderMapper;

    public EmployeeMapper(EmployeeTypeMapper employeeTypeMapper, GenderMapper genderMapper) {
        this.employeeTypeMapper = employeeTypeMapper;
        this.genderMapper = genderMapper;
    }
    public EmployeeDTO toDTO(Employee employee) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setId(employee.getId());
        employeeDTO.setType(employeeTypeMapper.toDTO(employee.getType()));
        employeeDTO.setFio(employee.getFio());
        employeeDTO.setGender(genderMapper.toDTO(employee.getGender()));
        employeeDTO.setBirthDate(employee.getBirth_date());
        employeeDTO.setChildrenAmount(employee.getChildren_amount());
        employeeDTO.setSalary(employee.getSalary());
        employeeDTO.setHireDate(employee.getHire_date());
        return employeeDTO;
    }

    public Employee toEntity(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setId(employeeDTO.getId());
        employee.setType(employeeTypeMapper.toEntity(employeeDTO.getType()));
        employee.setFio(employeeDTO.getFio());
        employee.setGender(genderMapper.toEntity(employeeDTO.getGender()));
        employee.setBirth_date(employeeDTO.getBirthDate());
        employee.setChildren_amount(employeeDTO.getChildrenAmount());
        employee.setSalary(employeeDTO.getSalary());
        employee.setHire_date(employeeDTO.getHireDate());
        return employee;
    }

    public ResponseEmployeeDTO toDTOResponse(Employee employee){
        ResponseEmployeeDTO responseEmployeeDTO = new ResponseEmployeeDTO();
        responseEmployeeDTO.setId(employee.getId());
        responseEmployeeDTO.setType(employeeTypeMapper.toDTO(employee.getType()).getType());
        responseEmployeeDTO.setFio(employee.getFio());
        responseEmployeeDTO.setGender(genderMapper.toDTO(employee.getGender()).getType());
        responseEmployeeDTO.setBirthDate(employee.getBirth_date());
        responseEmployeeDTO.setAmountChildren(employee.getChildren_amount());
        responseEmployeeDTO.setSalary(employee.getSalary());
        responseEmployeeDTO.setHireDate(employee.getHire_date());
        return responseEmployeeDTO;
    }
}