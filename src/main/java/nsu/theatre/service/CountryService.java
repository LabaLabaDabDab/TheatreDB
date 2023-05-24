package nsu.theatre.service;

import nsu.theatre.dto.CountryDTO;
import nsu.theatre.entity.Country;
import nsu.theatre.exception.NotFoundException;
import nsu.theatre.mapper.CountryMapper;
import nsu.theatre.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<CountryDTO> getAllCountries() {
        List<Country> countries = countryRepository.findAll();
        return countries.stream()
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