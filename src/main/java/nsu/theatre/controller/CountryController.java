package nsu.theatre.controller;

import nsu.theatre.dto.CountryDTO;
import nsu.theatre.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/countries")
public class CountryController {
    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public ResponseEntity<List<CountryDTO>> getAllCountries() {
        List<CountryDTO> countries = countryService.getAllCountries();
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountryDTO> getCountryById(@PathVariable("id") Long id) {
        CountryDTO country = countryService.getCountryById(id);
        if (country == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(country, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CountryDTO> createCountry(@RequestBody CountryDTO countryDTO) {
        CountryDTO createdCountry = countryService.createCountry(countryDTO);
        return new ResponseEntity<>(createdCountry, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CountryDTO> updateCountry(@PathVariable("id") Long id, @RequestBody CountryDTO countryDTO) {
        CountryDTO updatedCountry = countryService.updateCountry(id, countryDTO);
        if (updatedCountry == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedCountry, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable("id") Long id) {
        countryService.deleteCountry(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
