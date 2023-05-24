package nsu.theatre.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class GenderDTO {
    private Long id;
    private String type;
}
