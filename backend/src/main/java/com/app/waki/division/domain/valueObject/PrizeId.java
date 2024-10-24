package com.app.waki.division.domain.valueObject;

import com.app.waki.common.exceptions.ValidationException;
import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record PrizeId(UUID prize_id) {
    public PrizeId{
        if (prize_id == null) {
            throw new ValidationException("Prize id must not be null.");
        }
    }

    public PrizeId() {
        this(UUID.randomUUID());
    }
}
