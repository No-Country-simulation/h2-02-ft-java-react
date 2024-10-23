package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.UserRankingId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class UserRanking {

    @Id
    private UserRankingId userId;
    private Integer points;
    private Integer position;
    @ManyToOne
    private Division division;
}
