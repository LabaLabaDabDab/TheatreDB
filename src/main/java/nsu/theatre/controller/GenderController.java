package nsu.theatre.controller;

import nsu.theatre.dto.GenderDTO;
import nsu.theatre.service.GenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/genders")
public class GenderController {
    private final GenderService genderService;

    @Autowired
    public GenderController(GenderService genderService) {
        this.genderService = genderService;
    }

    @GetMapping
    public ResponseEntity<List<GenderDTO>> getAllGenders() {
        List<GenderDTO> genders = genderService.getAllGenders();
        return new ResponseEntity<>(genders, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenderDTO> getGenderById(@PathVariable("id") Long id) {
        GenderDTO gender = genderService.getGenderById(id);
        if (gender == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(gender, HttpStatus.OK);
    }

}