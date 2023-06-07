package nsu.theatre.service;

import nsu.theatre.dto.AuthorDTO;
import nsu.theatre.dto.filter.AuthorFilterDTO;
import nsu.theatre.dto.response.ResponseAuthorPerformanceDTO;
import nsu.theatre.entity.Author;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.AuthorMapper;
import nsu.theatre.repository.AuthorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;

    public AuthorService(AuthorRepository authorRepository, AuthorMapper authorMapper) {
        this.authorRepository = authorRepository;
        this.authorMapper = authorMapper;
    }

    public Page<AuthorDTO> getAllAuthors(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Author> pagedResult = authorRepository.findAll(pageable);
        return pagedResult.map(authorMapper::toDTO);
    }

    public List<AuthorDTO> getAllAuthorsList() {
        List<Author> authorList = authorRepository.findAll();
        return authorList.stream()
                .map(authorMapper::toDTO)
                .collect(Collectors.toList());
    }

    public AuthorDTO getAuthorById(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Author not found with id: " + id));
        return authorMapper.toDTO(author);
    }

    public AuthorDTO createAuthor(AuthorDTO authorDTO) {
        Author author = authorMapper.toEntity(authorDTO);
        Author savedAuthor = authorRepository.save(author);
        return authorMapper.toDTO(savedAuthor);
    }

    public AuthorDTO updateAuthor(Long id, AuthorDTO authorDTO) {
        Author existingAuthor = authorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Author not found with id: " + id));
        Author updatedAuthor = authorMapper.toEntity(authorDTO);
        updatedAuthor.setId(existingAuthor.getId());
        Author savedAuthor = authorRepository.save(updatedAuthor);
        return authorMapper.toDTO(savedAuthor);
    }

    public void deleteAuthor(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Author not found with id: " + id));
        authorRepository.delete(author);
    }

    public List<ResponseAuthorPerformanceDTO> findByFilter(AuthorFilterDTO authorFilterDTO) {
        List<Object[]> results = authorRepository.findByFilter(
                authorFilterDTO.getCentury().get(0),
                authorFilterDTO.getCentury().get(1),
                authorFilterDTO.getCountry(),
                authorFilterDTO.getGenre(),
                authorFilterDTO.getDate_performance().get(0),
                authorFilterDTO.getDate_performance().get(1)
                );
        List<ResponseAuthorPerformanceDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponseAuthorPerformanceDTO dto = new ResponseAuthorPerformanceDTO();
            dto.setName((String) result[0]);
            dto.setTitle((String) result[1]);
            dto.setCountry((String) result[2]);
            dto.setGenre((String) result[3]);
            dto.setBirthDate((Date) result[4]);
            dto.setDeathDate((Date) result[5]);
            dto.setDate_perf((Date) result[6]);
            response.add(dto);
        }

        return response;
    }
}
