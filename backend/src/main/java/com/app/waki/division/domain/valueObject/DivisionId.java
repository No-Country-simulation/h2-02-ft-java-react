package com.app.waki.division.domain.valueObject;

import io.jsonwebtoken.lang.Assert;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public record DivisionId(UUID division_id) {

    public DivisionId{
        Assert.notNull(division_id, "id must not be null");
    }

    public DivisionId() {
        this(UUID.randomUUID());
    }
}
