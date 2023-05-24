package nsu.theatre.mapper;

import nsu.theatre.dto.RoleDTO;
import nsu.theatre.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RoleMapper {
    private final GenderMapper genderMapper;
    private final PerformanceMapper performanceMapper;

    @Autowired
    public RoleMapper(GenderMapper genderMapper, PerformanceMapper performanceMapper) {
        this.genderMapper = genderMapper;
        this.performanceMapper = performanceMapper;
    }

    public RoleDTO toDTO(Role role) {
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(role.getId());
        roleDTO.setName(role.getName());
        roleDTO.setMain(role.getMain());
        roleDTO.setAge(role.getAge());
        roleDTO.setGender(genderMapper.toDTO(role.getGender()));
        roleDTO.setHeight(role.getHeight());
        roleDTO.setPerformance(performanceMapper.toDTO(role.getPerformance()));
        return roleDTO;
    }

    public Role toEntity(RoleDTO roleDTO) {
        Role role = new Role();
        role.setId(roleDTO.getId());
        role.setName(roleDTO.getName());
        role.setMain(roleDTO.getMain());
        role.setAge(roleDTO.getAge());
        role.setGender(genderMapper.toEntity(roleDTO.getGender()));
        role.setHeight(roleDTO.getHeight());
        role.setPerformance(performanceMapper.toEntity(roleDTO.getPerformance()));
        return role;
    }
}