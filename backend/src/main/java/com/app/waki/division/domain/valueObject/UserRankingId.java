package com.app.waki.division.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import jakarta.persistence.Embeddable;

@Embeddable
public record UserRankingId(String userId) {
    public UserRankingId{
        if (userId == null) {
            throw new ValidationException("Points must not be null.");
        }
    }
}
