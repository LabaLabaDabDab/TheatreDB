package nsu.theatre.mapper;

import nsu.theatre.dto.AuthorDTO;
import nsu.theatre.entity.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthorMapper {
    private final CountryMapper countryMapper;
    private final GenreMapper genreMapper;

    @Autowired
    public AuthorMapper(CountryMapper countryMapper, GenreMapper genreMapper) {
        this.countryMapper = countryMapper;
        this.genreMapper = genreMapper;
    }

    public AuthorDTO toDTO(Author author) {
        AuthorDTO authorDTO = new AuthorDTO();
        authorDTO.setId(author.getId());
        authorDTO.setName(author.getName());
        authorDTO.setCountry(countryMapper.toDTO(author.getCountry()));
        authorDTO.setGenre(genreMapper.toDTO(author.getGenre()));
        authorDTO.setBirthDate(author.getBirth_date());
        authorDTO.setDeathDate(author.getDeath_date());
        authorDTO.setTitle(author.getTitle());

        return authorDTO;
    }

    public Author toEntity(AuthorDTO authorDTO) {
        Author author = new Author();
        author.setId(authorDTO.getId());
        author.setName(authorDTO.getName());
        author.setCountry(countryMapper.toEntity(authorDTO.getCountry()));
        author.setGenre(genreMapper.toEntity(authorDTO.getGenre()));
        author.setBirth_date(authorDTO.getBirthDate());
        author.setDeath_date(authorDTO.getDeathDate());
        author.setTitle(authorDTO.getTitle());

        return author;
    }
}