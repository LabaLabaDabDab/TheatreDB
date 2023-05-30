package nsu.theatre.dto.filter;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AuthorFilterDTO {
    private List<Long> century;
    private List<Date> date_performance;
    private List<Long> country;
    private List<Long> genre;
}
