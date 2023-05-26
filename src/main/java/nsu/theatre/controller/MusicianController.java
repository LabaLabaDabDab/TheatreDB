package nsu.theatre.controller;

import nsu.theatre.dto.MusicianDTO;
import nsu.theatre.service.MusicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/musicians")
public class MusicianController {

    private final MusicianService musicianService;

    @Autowired
    public MusicianController(MusicianService musicianService) {
        this.musicianService = musicianService;
    }

    @GetMapping
    public ResponseEntity<List<MusicianDTO>> getAllMusicians() {
        List<MusicianDTO> musicians = musicianService.getAllMusicians();
        return new ResponseEntity<>(musicians, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MusicianDTO> getMusicianById(@PathVariable("id") Long id) {
        MusicianDTO musician = musicianService.getMusician(id);
        if (musician == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(musician, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MusicianDTO> createMusician(@RequestBody MusicianDTO musicianDTO) {
        MusicianDTO createdMusician = musicianService.createMusician(musicianDTO);
        return new ResponseEntity<>(createdMusician, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MusicianDTO> updateMusician(@PathVariable("id") Long id, @RequestBody MusicianDTO musicianDTO) {
        MusicianDTO updatedMusician = musicianService.updateMusician(id, musicianDTO);
        if (updatedMusician == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedMusician, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMusician(@PathVariable Long id) {
        musicianService.deleteMusician(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}