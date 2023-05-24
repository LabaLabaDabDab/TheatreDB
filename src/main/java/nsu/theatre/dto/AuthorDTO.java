package nsu.theatre.dto;

import lombok.Data;
import nsu.theatre.entity.Country;
import nsu.theatre.entity.Genre;

import java.sql.Date;

@Data
public class AuthorDTO {
    private Long id;
    private String name;
    private CountryDTO country;
    private GenreDTO genre;
    private Date birthDate;
    private Date deathDate;
    private String title;
}
