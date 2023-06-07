package nsu.theatre.controller;

import nsu.theatre.dto.GenderDTO;
import nsu.theatre.service.GenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/genders")
public class GenderController {
    private final GenderService genderService;

    @Autowired
    public GenderController(GenderService genderService) {
        this.genderService = genderService;
    }

    @GetMapping
    public ResponseEntity<Page<GenderDTO>> getAllGenders(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize) {
        Page<GenderDTO> page = genderService.getAllGenders(pageNo, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<GenderDTO>> getAllGendersList() {
        List<GenderDTO> genders = genderService.getAllGendersList();
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