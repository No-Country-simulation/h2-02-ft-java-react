package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.DivisionId;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Division {

    @Id
    private DivisionId id;
    @Enumerated(EnumType.STRING)
    private DivisionLevel division;
    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL, orphanRemoval = true)
    private final Set<UserRanking> rankings = new HashSet<>();
    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL, orphanRemoval = true)
    private final Set<Prize> prizes = new HashSet<>();

    public Division(){}
    public Division(DivisionLevel division){
        this.id = new DivisionId();
        this.division = division;
    }
    public void clearRankings() {
        this.rankings.clear();
    }

    public void addPrize(Prize prize) {
        prizes.add(prize);
        prize.setDivision(this);
    }

    public void addUserRanking(UserRanking ranking) {
        rankings.add(ranking);
        ranking.setDivision(this);
    }
}
