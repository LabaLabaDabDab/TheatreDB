package nsu.theatre.service;

import nsu.theatre.dto.RoleDTO;
import nsu.theatre.entity.Gender;
import nsu.theatre.entity.Performance;
import nsu.theatre.entity.Role;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.GenderMapper;
import nsu.theatre.mapper.PerformanceMapper;
import nsu.theatre.mapper.RoleMapper;
import nsu.theatre.repository.GenderRepository;
import nsu.theatre.repository.PerformanceRepository;
import nsu.theatre.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;
    private final PerformanceRepository performanceRepository;
    private final PerformanceMapper performanceMapper;
    private final GenderMapper genderMapper;
    private final GenderRepository genderRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository, RoleMapper roleMapper, PerformanceRepository performanceRepository, PerformanceMapper performanceMapper, GenderMapper genderMapper, GenderRepository genderRepository) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
        this.performanceRepository = performanceRepository;
        this.performanceMapper = performanceMapper;
        this.genderMapper = genderMapper;
        this.genderRepository = genderRepository;
    }

    public Page<RoleDTO> getAllRoles(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Role> pagedResult = roleRepository.findAll(pageable);
        return pagedResult.map(roleMapper::toDTO);
    }

    public List<RoleDTO> getAllRolesList() {
        List<Role> roleList = roleRepository.findAll();
        return roleList.stream()
                .map(roleMapper::toDTO)
                .collect(Collectors.toList());
    }

    public RoleDTO getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Role not found with id: " + id));
        return roleMapper.toDTO(role);
    }

    public RoleDTO createRole(RoleDTO roleDTO) {
        Performance performance = performanceRepository.findById(roleDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("performance not found with id: " + roleDTO.getPerformance().getId()));

        Gender gender = genderRepository.findById(roleDTO.getGender().getId())
                .orElseThrow(() -> new NotFoundException("gender not found with id: " + roleDTO.getGender().getId()));

        roleDTO.setPerformance(performanceMapper.toDTO(performance));
        roleDTO.setGender(genderMapper.toDTO(gender));

        Role role = roleMapper.toEntity(roleDTO);
        Role createdRole = roleRepository.save(role);
        return roleMapper.toDTO(createdRole);
    }

    public RoleDTO updateRole(Long id, RoleDTO roleDTO) {
        Role existingRole = roleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Role not found with id: " + id));
        Performance performance = performanceRepository.findById(roleDTO.getPerformance().getId())
                .orElseThrow(() -> new NotFoundException("performance not found with id: " + roleDTO.getPerformance().getId()));
        Gender gender = genderRepository.findById(roleDTO.getGender().getId())
                .orElseThrow(() -> new NotFoundException("gender not found with id: " + roleDTO.getGender().getId()));

        existingRole.setName(roleDTO.getName());
        existingRole.setMain(roleDTO.getMain());
        existingRole.setGender(gender);
        existingRole.setAge(roleDTO.getAge());
        existingRole.setHeight(roleDTO.getHeight());
        existingRole.setPerformance(performance);

        Role savedRole = roleRepository.save(existingRole);
        return roleMapper.toDTO(savedRole);
    }

    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Role not found with id: " + id));
        roleRepository.deleteById(id);
    }
}