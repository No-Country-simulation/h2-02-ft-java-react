package com.app.waki.match.infrastructure;

import com.app.waki.match.application.MatchService;
import com.app.waki.match.domain.Match;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/match")
public class MatchController {

    private final MatchService service;

    public MatchController(MatchService service) {
        this.service = service;
    }

//    @GetMapping("/updateMatches")
//    public void updateMatches() throws IOException, InterruptedException {
//        service.UpdateMatches(matchIds);
//    }

    @GetMapping("/getMatches")
    public ResponseEntity<List<Match>> UpdateAndGetMatches() throws IOException, InterruptedException {
        service.UpdateMatches();
        List<Match> matches = service.findAllMatches();
        return new ResponseEntity<>(matches, HttpStatus.OK);
    }

//    @GetMapping("/getMatches2")
//    public ResponseEntity<List<Match>> getMatches() {
//        List<Match> matches = service.findAllMatches();
//        return new ResponseEntity<>(matches, HttpStatus.OK);
//    }
}
