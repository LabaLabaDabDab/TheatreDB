package nsu.theatre.mapper;

import nsu.theatre.dto.CountryDTO;
import nsu.theatre.entity.Country;
import org.springframework.stereotype.Component;

@Component
public class CountryMapper {
    public CountryDTO toDTO(Country country) {
        CountryDTO countryDTO = new CountryDTO();
        countryDTO.setId(country.getId());
        countryDTO.setName(country.getName());
        return countryDTO;
    }

    public Country toEntity(CountryDTO countryDTO) {
        Country country = new Country();
        country.setId(countryDTO.getId());
        country.setName(countryDTO.getName());
        return country;
    }
}
