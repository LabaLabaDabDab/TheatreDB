package nsu.theatre.service;

import nsu.theatre.dto.PerformanceDTO;
import nsu.theatre.dto.filter.PerformanceByAuthorFilterDTO;
import nsu.theatre.dto.filter.PerformanceDetailsDTO;
import nsu.theatre.dto.response.ResponsePerformanceByAuthorDTO;
import nsu.theatre.dto.response.ResponsePerformanceDetailsDTO;
import nsu.theatre.entity.Author;
import nsu.theatre.entity.Director;
import nsu.theatre.entity.Musician;
import nsu.theatre.entity.Performance;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.AuthorMapper;
import nsu.theatre.mapper.DirectorMapper;
import nsu.theatre.mapper.MusicianMapper;
import nsu.theatre.mapper.PerformanceMapper;
import nsu.theatre.repository.AuthorRepository;
import nsu.theatre.repository.DirectorRepository;
import nsu.theatre.repository.MusicianRepository;
import nsu.theatre.repository.PerformanceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PerformanceService {
    private final PerformanceRepository performanceRepository;
    private final PerformanceMapper performanceMapper;
    private final AuthorMapper authorMapper;
    private final AuthorRepository authorRepository;
    private final DirectorMapper directorMapper;
    private final DirectorRepository directorRepository;
    private final MusicianMapper musicianMapper;
    private final MusicianRepository musicianRepository;

    public PerformanceService(PerformanceRepository performanceRepository, PerformanceMapper performanceMapper, AuthorMapper authorMapper, AuthorRepository authorRepository, DirectorMapper directorMapper, DirectorRepository directorRepository, MusicianMapper musicianMapper, MusicianRepository musicianRepository) {
        this.performanceRepository = performanceRepository;
        this.performanceMapper = performanceMapper;
        this.authorMapper = authorMapper;
        this.authorRepository = authorRepository;
        this.directorMapper = directorMapper;
        this.directorRepository = directorRepository;
        this.musicianMapper = musicianMapper;
        this.musicianRepository = musicianRepository;
    }

    public Page<PerformanceDTO> getAllPerformances(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Performance> pagedResult = performanceRepository.findAll(pageable);
        return pagedResult.map(performanceMapper::toDTO);
    }

    public List<PerformanceDTO> getAllPerformancesList() {
        List<Performance> performanceList = performanceRepository.findAll();
        return performanceList.stream()
                .map(performanceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public PerformanceDTO getPerformanceById(Long id) {
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + id));
        return performanceMapper.toDTO(performance);
    }

    public PerformanceDTO createPerformance(PerformanceDTO performanceDTO) {
        Author author = authorRepository.findById(performanceDTO.getAuthor().getId())
                .orElseThrow(() -> new NotFoundException("Author not found with id: " + performanceDTO.getAuthor().getId()));
        Musician musician = musicianRepository.findById(performanceDTO.getMusician().getId())
                .orElseThrow(() -> new NotFoundException("Musician not found with id: " + performanceDTO.getMusician().getId()));
        Director director = directorRepository.findById(performanceDTO.getDirector().getId())
                .orElseThrow(() -> new NotFoundException("Director not found with id: " + performanceDTO.getDirector().getId()));

        performanceDTO.setAuthor(authorMapper.toDTO(author));
        performanceDTO.setDirector(directorMapper.toDTO(director));
        performanceDTO.setMusician(musicianMapper.toDTO(musician));

        Performance performance = performanceMapper.toEntity(performanceDTO);
        performance.setAuthor(author);
        performance.setMusician(musician);
        performance.setDirector(director);
        Performance savedPerformance = performanceRepository.save(performance);
        return performanceMapper.toDTO(savedPerformance);
    }

    public PerformanceDTO updatePerformance(Long id, PerformanceDTO performanceDTO) {
        Author author = authorRepository.findById(performanceDTO.getAuthor().getId())
                .orElseThrow(() -> new NotFoundException("Author not found with id: " + performanceDTO.getAuthor().getId()));
        Musician musician = musicianRepository.findById(performanceDTO.getMusician().getId())
                .orElseThrow(() -> new NotFoundException("Musician not found with id: " + performanceDTO.getMusician().getId()));
        Director director = directorRepository.findById(performanceDTO.getDirector().getId())
                .orElseThrow(() -> new NotFoundException("Director not found with id: " + performanceDTO.getDirector().getId()));
        Performance existingPerformance = performanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + id));

        existingPerformance.setAuthor(author);
        existingPerformance.setDirector(director);
        existingPerformance.setMusician(musician);
        existingPerformance.setLimit(performanceDTO.getAgeLimit());
        existingPerformance.setTime(performanceDTO.getTimeDuration());
        existingPerformance.setPremiere(performanceDTO.getPremiereDate());

        Performance savedPerformance = performanceRepository.save(existingPerformance);
        return performanceMapper.toDTO(savedPerformance);
    }

    public void deletePerformance(Long id) {
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Performance not found with id: " + id));
        performanceRepository.delete(performance);
    }

    public List<ResponsePerformanceByAuthorDTO> findByFilter(PerformanceByAuthorFilterDTO filterDTO) {
        List<Object[]> results = performanceRepository.findByFilter(
                filterDTO.getGenre(),
                filterDTO.getAuthor(),
                filterDTO.getCountry(),
                filterDTO.getCentury().get(0),
                filterDTO.getCentury().get(1),
                filterDTO.getDatePerformance().get(0),
                filterDTO.getDatePerformance().get(1)
        );

        List<ResponsePerformanceByAuthorDTO> response = new ArrayList<>();

        for (Object[] result : results) {
            ResponsePerformanceByAuthorDTO dto = new ResponsePerformanceByAuthorDTO();
            dto.setAuthorName((String) result[0]);
            dto.setTitle((String) result[1]);
            dto.setGenre((String) result[2]);
            dto.setCountry((String) result[3]);
            dto.setAuthorBirth((Date) result[4]);
            dto.setAuthorDeath((Date) result[5]);
            dto.setFirstPerformanceDate((Date) result[6]);
            response.add(dto);
        }

        return response;
    }

    public List<ResponsePerformanceDetailsDTO> getPerformanceDetails(PerformanceDetailsDTO detailsDTO) {
        List<Object[]> results = performanceRepository.findPerformanceDetails(detailsDTO.getPerformance());

        List<ResponsePerformanceDetailsDTO> response = new ArrayList<>();
        for (Object[] result : results) {
            ResponsePerformanceDetailsDTO dto = new ResponsePerformanceDetailsDTO();
            dto.setActorName((String) result[0]);
            dto.setProducerName((String) result[1]);
            dto.setMusicianName((String) result[2]);
            dto.setDirectorName((String) result[3]);
            dto.setAuthorName((String) result[4]);
            dto.setPremiereDate((Date) result[5]);
            response.add(dto);
        }

        return response;
    }
}