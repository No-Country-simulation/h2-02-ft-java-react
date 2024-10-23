package com.app.waki.prediction.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record Team(String team) {

    public Team {
        validateTeamName(team);
    }
    private static void validateTeamName(String team) {
        if (team == null) {
            throw new ValidationException("Team name must not be null.");
        }
        int MIN_LENGTH = 2;
        int MAX_LENGTH = 35;
        if (team.length() < MIN_LENGTH || team.length() > MAX_LENGTH) {
            throw new ValidationException("The team name text must contain between " + MIN_LENGTH + " and " + MAX_LENGTH + " characters.");
        }
    }
}
