package com.app.waki.division.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record UserRankingId(String user_id) {
    public UserRankingId{
        if (user_id == null) {
            throw new ValidationException("Points must not be null.");
        }
    }
}
