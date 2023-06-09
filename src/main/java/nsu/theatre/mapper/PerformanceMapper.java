package nsu.theatre.mapper;

import nsu.theatre.dto.PerformanceDTO;
import nsu.theatre.entity.Performance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PerformanceMapper {
    private final AuthorMapper authorMapper;
    private final DirectorMapper directorMapper;
    private final MusicianMapper musicianMapper;

    @Autowired
    public PerformanceMapper(AuthorMapper authorMapper, DirectorMapper directorMapper, MusicianMapper musicianMapper) {
        this.authorMapper = authorMapper;
        this.directorMapper = directorMapper;
        this.musicianMapper = musicianMapper;
    }

    public PerformanceDTO toDTO(Performance performance) {
        PerformanceDTO performanceDTO = new PerformanceDTO();
        performanceDTO.setId(performance.getId());
        performanceDTO.setAgeLimit(performance.getLimit());
        performanceDTO.setPremiereDate(performance.getPremiere());
        performanceDTO.setAuthor(authorMapper.toDTO(performance.getAuthor()));
        performanceDTO.setTimeDuration(performance.getTime());
        performanceDTO.setDirector(directorMapper.toDTO(performance.getDirector()));
        performanceDTO.setMusician(musicianMapper.toDTO(performance.getMusician()));

        return performanceDTO;
    }

    public Performance toEntity(PerformanceDTO performanceDTO) {
        Performance performance = new Performance();
        performance.setId(performanceDTO.getId());
        performance.setLimit(performanceDTO.getAgeLimit());
        performance.setPremiere(performanceDTO.getPremiereDate());
        performance.setAuthor(authorMapper.toEntity(performanceDTO.getAuthor()));
        performance.setTime(performanceDTO.getTimeDuration());
        performance.setDirector(directorMapper.toEntity(performanceDTO.getDirector()));
        performance.setMusician(musicianMapper.toEntity(performanceDTO.getMusician()));

        return performance;
    }
}