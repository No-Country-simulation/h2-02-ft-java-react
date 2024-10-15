package com.app.waki.match.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class MatchResponse {

    private List<Match> matches;
}
