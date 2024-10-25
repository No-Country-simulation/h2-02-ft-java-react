package com.app.waki.division.domain;

import com.app.waki.division.domain.valueObject.UserRankingId;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@EqualsAndHashCode(exclude = "division")  // Excluimos la referencia a Division
@ToString(exclude = "division")
@Getter
public class UserRanking {

    @Id
    private UserRankingId userId;
    private String username;
    private Integer points;
    private Integer position;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_id")
    private Division division;
    @Version
    private Long version;

    public UserRanking(){}
    public UserRanking(Division division, UserRankingId id, String username){
        this.userId = id;
        this.username = username;
        this.points = 0;
        this.position = 0;
        this.division = division;
    }

    public static UserRanking createUserRanking(Division division, UUID id, String username){
        var generateId = new UserRankingId(id);
        return new UserRanking(division, generateId, username);
    }

}
