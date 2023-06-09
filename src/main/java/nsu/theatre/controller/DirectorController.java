package nsu.theatre.controller;

import nsu.theatre.dto.DirectorDTO;
import nsu.theatre.service.DirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/directors")
public class DirectorController {

    private final DirectorService directorService;

    @Autowired
    public DirectorController(DirectorService directorService) {
        this.directorService = directorService;
    }

    @GetMapping
    public ResponseEntity<Page<DirectorDTO>> getAllDirectors(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize) {
        Page<DirectorDTO> page = directorService.getAllDirectors(pageNo, pageSize);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<DirectorDTO>> getAllDirectorsList() {
        List<DirectorDTO> directors = directorService.getAllDirectorsList();
        return new ResponseEntity<>(directors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DirectorDTO> getDirectorById(@PathVariable("id") Long id) {
        DirectorDTO director = directorService.getDirector(id);
        if (director == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(director, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DirectorDTO> createDirector(@RequestBody DirectorDTO directorDTO) {
        DirectorDTO createdDirector = directorService.createDirector(directorDTO);
        return new ResponseEntity<>(createdDirector, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DirectorDTO> updateDirector(@PathVariable("id") Long id, @RequestBody DirectorDTO directorDTO) {
        DirectorDTO updatedDirector = directorService.updateDirector(id, directorDTO);
        if (updatedDirector == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedDirector, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDirector(@PathVariable Long id) {
        directorService.deleteDirector(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}