package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.PrizeType;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Prize {

    @Id
    private Long id;
    private String tittle;
    private String description;
    private String imgUrl;
    @Enumerated(EnumType.STRING)
    private PrizeType type;
    @ManyToOne
    private Division division;
    private LocalDate endDate;
}
