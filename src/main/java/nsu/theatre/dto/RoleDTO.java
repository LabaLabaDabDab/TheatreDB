package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.Gender;

@Data
public class RoleDTO {
    private Long id;
    private String name;
    private Boolean main;
    private Long age;
    private GenderDTO gender;
    private Long height;
    private PerformanceDTO performance;
}
