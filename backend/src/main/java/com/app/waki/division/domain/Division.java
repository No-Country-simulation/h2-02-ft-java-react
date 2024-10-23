package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.DivisionId;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

@Entity
public class Division {

    @Id
    private DivisionId id;
    @Enumerated(EnumType.STRING)
    private DivisionLevel division;

}
