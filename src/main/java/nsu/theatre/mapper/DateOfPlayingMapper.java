package nsu.theatre.mapper;

import nsu.theatre.dto.DateOfPlayingDTO;
import nsu.theatre.entity.DateOfPlaying;
import org.springframework.stereotype.Component;

@Component
public class DateOfPlayingMapper {
    public DateOfPlayingDTO toDTO(DateOfPlaying dateOfPlaying) {
        DateOfPlayingDTO dateOfPlayingDTO = new DateOfPlayingDTO();
        dateOfPlayingDTO.setId(dateOfPlaying.getId());
        dateOfPlayingDTO.setDateOfPerformance(dateOfPlaying.getDate_of_performance());
        dateOfPlayingDTO.setSeason(dateOfPlaying.getSeason());
        dateOfPlayingDTO.setTicketsCount(dateOfPlaying.getTicketsCount());
        dateOfPlayingDTO.setIsTour(dateOfPlaying.getIsTour());
        return dateOfPlayingDTO;
    }

    public DateOfPlaying toEntity(DateOfPlayingDTO dateOfPlayingDTO) {
        DateOfPlaying dateOfPlaying = new DateOfPlaying();
        dateOfPlaying.setId(dateOfPlayingDTO.getId());
        dateOfPlaying.setDate_of_performance(dateOfPlayingDTO.getDateOfPerformance());
        dateOfPlaying.setSeason(dateOfPlayingDTO.getSeason());
        dateOfPlaying.setTicketsCount(dateOfPlayingDTO.getTicketsCount());
        dateOfPlaying.setIsTour(dateOfPlayingDTO.getIsTour());
        return dateOfPlaying;
    }
}