package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.PrizeId;
import com.app.waki.division.domain.valueObject.PrizeType;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@EqualsAndHashCode
@Getter
@Setter
public class Prize {

    @Id
    private PrizeId id;
    private String tittle;
    private String description;
    private String imgUrl;
    @Enumerated(EnumType.STRING)
    private PrizeType type;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_id")
    private Division division;
    private LocalDate endDate;

    public Prize(){}
}
