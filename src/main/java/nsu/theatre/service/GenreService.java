package nsu.theatre.service;

import nsu.theatre.dto.GenreDTO;
import nsu.theatre.entity.Country;
import nsu.theatre.entity.Genre;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.GenreMapper;
import nsu.theatre.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenreService {
    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    public GenreService(GenreRepository genreRepository, GenreMapper genreMapper) {
        this.genreRepository = genreRepository;
        this.genreMapper = genreMapper;
    }

    public Page<GenreDTO> getAllGenres(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Genre> pagedResult = genreRepository.findAll(pageable);
        return pagedResult.map(genreMapper::toDTO);
    }

    public List<GenreDTO> getAllGenresList() {
        List<Genre> genreList = genreRepository.findAll();
        return genreList.stream()
                .map(genreMapper::toDTO)
                .collect(Collectors.toList());
    }

    public GenreDTO getGenreById(Long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Genre not found with id: " + id));
        return genreMapper.toDTO(genre);
    }

    public GenreDTO createGenre(GenreDTO genreDTO) {
        Genre genre = genreMapper.toEntity(genreDTO);
        Genre savedGenre = genreRepository.save(genre);
        return genreMapper.toDTO(savedGenre);
    }

    public GenreDTO updateGenre(Long id, GenreDTO genreDTO) {
        Genre existingGenre = genreRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Genre not found with id: " + id));
        Genre updatedGenre = genreMapper.toEntity(genreDTO);
        updatedGenre.setName(genreDTO.getName());
        Genre savedGenre = genreRepository.save(updatedGenre);
        return genreMapper.toDTO(savedGenre);
    }

    public void deleteGenre(Long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Genre not found with id: " + id));
        genreRepository.delete(genre);
    }
}