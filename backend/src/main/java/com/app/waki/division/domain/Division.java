package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.DivisionId;
import com.app.waki.division.domain.valueObject.DivisionLevel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@EqualsAndHashCode(exclude = {"rankings", "prizes"})
@ToString(exclude = {"rankings", "prizes"})
@Getter
public class Division {

    @Id
    private DivisionId id;
    @Enumerated(EnumType.STRING)
    private DivisionLevel division;
    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL, orphanRemoval = true)
    private final Set<UserRanking> rankings = new HashSet<>();
    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL, orphanRemoval = true)
    private final Set<Prize> prizes = new HashSet<>();
    @Version
    private Long version;

    public Division(){}
    public Division(DivisionLevel division){
        this.id = new DivisionId();
        this.division = division;
    }
    public void clearRankings() {
        this.rankings.clear();
    }

    public void addPrize(Prize prize) {
        this.prizes.add(prize);
    }

    public void createUserRanking(UUID id, String username) {
        UserRanking newUser = UserRanking.createUserRanking(this, id, username);
        this.rankings.add(newUser);
    }

    public void addUserRanking(UserRanking ranking) {
        this.rankings.add(ranking);
        ranking.updateDivision(this.division);
    }
}
