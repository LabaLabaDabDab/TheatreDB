package nsu.theatre.service;

import nsu.theatre.dto.RoleDTO;
import nsu.theatre.entity.Role;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.RoleMapper;
import nsu.theatre.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Autowired
    public RoleService(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    public List<RoleDTO> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return roles.stream()
                .map(roleMapper::toDTO)
                .collect(Collectors.toList());
    }

    public RoleDTO getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Role not found with id: " + id));
        return roleMapper.toDTO(role);
    }

    public RoleDTO createRole(RoleDTO roleDTO) {
        Role role = roleMapper.toEntity(roleDTO);
        Role createdRole = roleRepository.save(role);
        return roleMapper.toDTO(createdRole);
    }

    public RoleDTO updateRole(Long id, RoleDTO roleDTO) {
        Role existingRole = roleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Role not found with id: " + id));
        Role updatedRole = roleMapper.toEntity(roleDTO);
        updatedRole.setId(existingRole.getId());
        Role savedRole = roleRepository.save(updatedRole);
        return roleMapper.toDTO(savedRole);
    }

    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Role not found with id: " + id));
        roleRepository.deleteById(id);
    }
}