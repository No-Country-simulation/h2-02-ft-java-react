package com.app.waki.match.infrastructure;

import com.app.waki.match.application.OddsService;
import com.app.waki.match.domain.odds.Odds;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/odd")
public class OddController {

    @Autowired
    private final OddsService oddsService;

    @GetMapping("/fetch-odds")
    public String fetchOdds() {
        try {
            oddsService.fetchAndSaveOdds();
            return "Odds data fetched and saved successfully!";
        } catch (Exception e) {
            return "Failed to fetch Odds data: " + e.getMessage();
        }
    }

    @GetMapping("/allOdds")
    public List<Odds> getAllOdds() {
        return oddsService.getAllOdds();
    }

    @GetMapping("/{id}")
    public Odds getOdd(@PathVariable("id") Long id) {
        return oddsService.getOdd(id);
    }
}
