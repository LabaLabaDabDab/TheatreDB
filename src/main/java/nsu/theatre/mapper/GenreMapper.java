package nsu.theatre.mapper;

import nsu.theatre.dto.GenreDTO;
import nsu.theatre.entity.Genre;
import org.springframework.stereotype.Component;

@Component
public class GenreMapper {
    public GenreDTO toDTO(Genre genre) {
        GenreDTO genreDTO = new GenreDTO();
        genreDTO.setId(genre.getId());
        genreDTO.setName(genre.getName());

        return genreDTO;
    }

    public Genre toEntity(GenreDTO genreDTO) {
        Genre genre = new Genre();
        genre.setId(genreDTO.getId());
        genre.setName(genreDTO.getName());

        return genre;
    }
}


