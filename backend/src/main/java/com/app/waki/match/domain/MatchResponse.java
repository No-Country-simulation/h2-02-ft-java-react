package com.app.waki.match.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class MatchResponse {

    @JsonProperty("matches") // Asegúrate de que este nombre coincida con el JSON que recibes
    private List<Match> matches;

    // Getters y Setters
    public List<Match> getMatches() {
        return matches;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }
}
