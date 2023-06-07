package nsu.theatre.service;

import nsu.theatre.dto.CountryDTO;
import nsu.theatre.entity.Country;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.CountryMapper;
import nsu.theatre.repository.CountryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryService {
    private final CountryRepository countryRepository;
    private final CountryMapper countryMapper;

    public CountryService(CountryRepository countryRepository, CountryMapper countryMapper) {
        this.countryRepository = countryRepository;
        this.countryMapper = countryMapper;
    }

    public Page<CountryDTO> getAllCountries(Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Country> pagedResult = countryRepository.findAll(pageable);
        return pagedResult.map(countryMapper::toDTO);
    }

    public List<CountryDTO> getAllCountriesList() {
        List<Country> countryList = countryRepository.findAll();
        return countryList.stream()
                .map(countryMapper::toDTO)
                .collect(Collectors.toList());
    }


    public CountryDTO getCountryById(Long id) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Country not found with id: " + id));
        return countryMapper.toDTO(country);
    }

    public CountryDTO createCountry(CountryDTO countryDTO) {
        Country country = countryMapper.toEntity(countryDTO);
        Country savedCountry = countryRepository.save(country);
        return countryMapper.toDTO(savedCountry);
    }

    public CountryDTO updateCountry(Long id, CountryDTO countryDTO) {
        Country existingCountry = countryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Country not found with id: " + id));
        Country updatedCountry = countryMapper.toEntity(countryDTO);
        updatedCountry.setId(existingCountry.getId());
        Country savedCountry = countryRepository.save(updatedCountry);
        return countryMapper.toDTO(savedCountry);
    }

    public void deleteCountry(Long id) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Country not found with id: " + id));
        countryRepository.delete(country);
    }
}