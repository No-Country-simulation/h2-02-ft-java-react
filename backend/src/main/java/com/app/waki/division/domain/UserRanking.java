package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.DivisionLevel;
import com.app.waki.division.domain.valueObject.UserRankingId;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@EqualsAndHashCode(exclude = "division")
@ToString(exclude = "division")
@Getter
public class UserRanking {

    @Id
    private UserRankingId userId;
    private String username;
    private Integer points;
    private Integer position;
    @Enumerated(EnumType.STRING)
    private DivisionLevel divisionLevel;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_id")
    private Division division;
    @Version
    private Long version;

    public UserRanking(){}
    public UserRanking(Division division, UserRankingId id, String username, DivisionLevel divisionLevel){
        this.userId = id;
        this.username = username;
        this.points = 0;
        this.position = 0;
        this.division = division;
        this.divisionLevel = divisionLevel;
    }

    public static UserRanking createUserRanking(Division division, UUID id, String username){
        var generateId = new UserRankingId(id);
        return new UserRanking(division, generateId, username, division.getDivision());
    }

    public void updatePoints(Integer points){
        this.points = points;
    }

    public void updatePosition(Integer position){
        this.position = position;
    }

    public void updateDivision(DivisionLevel divisionLevel){
        this.divisionLevel = divisionLevel;
    }
}
